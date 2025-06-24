# Chat 下一阶段设计：多Agent群聊模式 + 记忆系统

## 🎯 设计原则：避免过度工程化

### **现状评估**

- ✅ **已完成**: 统一聊天模式，智能意图识别，基础消息流
- ✅ **当前架构**: 1351行单文件，功能完整，运行稳定
- 🎯 **下一步**: 渐进式添加多agent群聊和记忆功能，不破坏现有架构

### **设计原则**

1. **最小可行产品(MVP)**: 只添加必要功能
2. **渐进式增强**: 在现有基础上扩展，不重构
3. **实用优先**: 解决真实用户需求，不追求技术完美
4. **保持简单**: 避免复杂的架构设计

## 🤖 多Agent群聊模式设计

### **核心理念：群聊体验**

- 用户体验保持不变，就像普通聊天
- 每个Agent有独立头像和个性
- 单Agent时：一对一聊天
- 多Agent时：群聊模式，多个专家同时发言
- 最后有协调员做汇总总结

### **Agent配置和头像设计**

```typescript
// Agent头像和个性设计
const WORKER_AGENTS: Record<WorkerAgentType, WorkerAgent> = {
  style_advisor: {
    type: 'style_advisor',
    name: '小雅',
    emoji: '👗',
    avatar: '/avatars/style-advisor.png', // 时尚女性头像
    personality: '温暖专业的穿搭顾问',
    description: '专业的整体造型建议和穿搭指导',
    specialties: ['整体搭配', '风格定位', '单品推荐', '造型建议'],
    chatStyle: 'friendly' // 聊天风格：友好亲切
  },
  color_expert: {
    type: 'color_expert',
    name: '彩虹',
    emoji: '🎨',
    avatar: '/avatars/color-expert.png', // 艺术家风格头像
    personality: '充满创意的色彩专家',
    description: '专注于色彩搭配和色彩理论指导',
    specialties: ['色彩搭配', '肤色分析', '色彩心理学', '季节色彩'],
    chatStyle: 'creative' // 聊天风格：富有创意
  },
  trend_analyst: {
    type: 'trend_analyst',
    name: '潮流',
    emoji: '⭐',
    avatar: '/avatars/trend-analyst.png', // 时尚达人头像
    personality: '敏锐的潮流观察者',
    description: '了解最新时尚趋势和流行元素',
    specialties: ['流行趋势', '时尚资讯', '品牌推荐', '潮流预测'],
    chatStyle: 'trendy' // 聊天风格：时尚前卫
  },
  occasion_guide: {
    type: 'occasion_guide',
    name: '场合',
    emoji: '📅',
    avatar: '/avatars/occasion-guide.png', // 优雅女士头像
    personality: '细致的场合搭配专家',
    description: '为不同场合提供专业着装建议',
    specialties: ['职场穿搭', '约会装扮', '聚会造型', '正式场合'],
    chatStyle: 'elegant' // 聊天风格：优雅得体
  },
  body_consultant: {
    type: 'body_consultant',
    name: '美型',
    emoji: '💪',
    avatar: '/avatars/body-consultant.png', // 健康顾问头像
    personality: '专业的体型管理师',
    description: '根据体型特点提供量身定制的穿搭建议',
    specialties: ['体型分析', '显瘦技巧', '比例调整', '身材优化'],
    chatStyle: 'professional' // 聊天风格：专业务实
  },
  coordinator: {
    type: 'coordinator',
    name: 'AI助手',
    emoji: '🤝',
    avatar: '/avatars/coordinator.png', // AI助手头像
    personality: '智能的协调总结者',
    description: '整合专家建议，提供综合方案',
    specialties: ['建议整合', '方案总结', '决策支持'],
    chatStyle: 'systematic' // 聊天风格：系统化
  }
};

interface WorkerAgent {
  type: WorkerAgentType;
  name: string;
  emoji: string;
  avatar: string;
  personality: string;
  description: string;
  specialties: string[];
  chatStyle: 'friendly' | 'creative' | 'trendy' | 'elegant' | 'professional' | 'systematic';
}
```

### **群聊消息类型扩展**

```typescript
// 扩展消息类型支持群聊
interface ChatMessage {
  id: string;
  type: 'text' | 'image' | 'loading' | 'typing' | 'summary';
  role: 'user' | 'agent' | 'coordinator';
  content?: string;
  imageUrl?: string;
  timestamp: Date;

  // 群聊相关字段
  agentType?: WorkerAgentType; // 发言的agent类型
  agentName?: string; // agent名称
  agentAvatar?: string; // agent头像
  isGroupMessage?: boolean; // 是否为群聊消息
  threadId?: string; // 线程ID，用于并发处理

  metadata?: {
    suggestions?: string[];
    confidence?: number;
    replyTo?: string;
    reactions?: Reaction[];
    processingTime?: number; // 处理时间
  };
}

// 线程管理
interface MessageThread {
  id: string;
  userMessage: string;
  participatingAgents: WorkerAgentType[];
  responses: Record<WorkerAgentType, ChatMessage>;
  coordinatorSummary?: ChatMessage;
  status: 'processing' | 'complete' | 'error';
  startTime: Date;
}
```

### **群聊模式的Agent处理流程**

```typescript
// 增强的多Agent协调器 - 群聊模式
class GroupChatCoordinator {
  private planner: EnhancedPlannerAgent;
  private workers: Map<WorkerAgentType, EnhancedWorkerAgent>;
  private activeThreads: Map<string, MessageThread>;

  constructor() {
    this.planner = new EnhancedPlannerAgent();
    this.workers = new Map();
    this.activeThreads = new Map();

    // 初始化所有worker agents
    Object.keys(WORKER_AGENTS).forEach(agentType => {
      if (agentType !== 'coordinator') {
        this.workers.set(agentType as WorkerAgentType, new EnhancedWorkerAgent(agentType as WorkerAgentType));
      }
    });
  }

  async processMessage(userMessage: string, context: {
    userProfile?: any;
    sessionMemory?: any;
    onAgentResponse?: (message: ChatMessage) => void; // 实时回调
    onComplete?: (summary: ChatMessage) => void; // 完成回调
  }): Promise<{
    threadId: string;
    participatingAgents: WorkerAgentType[];
    taskAnalysis: TaskAnalysis;
  }> {
    // Step 1: 分析任务，决定参与的agents
    const taskAnalysis = await this.planner.analyzeTask(userMessage, context);
    const threadId = generateThreadId();

    const participatingAgents = [
      taskAnalysis.primaryAgent,
      ...(taskAnalysis.collaboratingAgents || [])
    ];

    // Step 2: 创建线程
    const thread: MessageThread = {
      id: threadId,
      userMessage,
      participatingAgents,
      responses: {},
      status: 'processing',
      startTime: new Date()
    };
    this.activeThreads.set(threadId, thread);

    // Step 3: 并发处理 - 各agent独立发言
    this.processAgentsInParallel(thread, context);

    return {
      threadId,
      participatingAgents,
      taskAnalysis
    };
  }

  private async processAgentsInParallel(
    thread: MessageThread,
    context: any
  ) {
    // 并发启动所有agents，模拟真实群聊
    const agentPromises = thread.participatingAgents.map(async (agentType, index) => {
      // 添加随机延迟，模拟真实思考时间
      const thinkingDelay = 1000 + Math.random() * 2000 + index * 500;

      // 先显示typing状态
      this.showAgentTyping(agentType, thread.id, context.onAgentResponse);

      await new Promise(resolve => setTimeout(resolve, thinkingDelay));

      try {
        const worker = this.workers.get(agentType)!;
        const response = await worker.process(thread.userMessage, {
          ...context,
          collaborationMode: thread.participatingAgents.length > 1 ? 'multi' : 'single',
          collaboratingAgents: thread.participatingAgents.filter(a => a !== agentType),
          threadId: thread.id
        });

        const agentMessage: ChatMessage = {
          id: generateMessageId(),
          type: 'text',
          role: 'agent',
          content: response,
          timestamp: new Date(),
          agentType,
          agentName: WORKER_AGENTS[agentType].name,
          agentAvatar: WORKER_AGENTS[agentType].avatar,
          isGroupMessage: thread.participatingAgents.length > 1,
          threadId: thread.id,
          metadata: {
            processingTime: Date.now() - thread.startTime.getTime()
          }
        };

        // 实时发送agent回复
        thread.responses[agentType] = agentMessage;
        context.onAgentResponse?.(agentMessage);

      } catch (error) {
        console.error(`Agent ${agentType} error:`, error);
        // 发送错误消息
        const errorMessage: ChatMessage = {
          id: generateMessageId(),
          type: 'text',
          role: 'agent',
          content: `抱歉，${WORKER_AGENTS[agentType].name}遇到了一些问题。`,
          timestamp: new Date(),
          agentType,
          agentName: WORKER_AGENTS[agentType].name,
          agentAvatar: WORKER_AGENTS[agentType].avatar,
          isGroupMessage: thread.participatingAgents.length > 1,
          threadId: thread.id
        };
        context.onAgentResponse?.(errorMessage);
      }
    });

    // 等待所有agents完成
    await Promise.all(agentPromises);

    // Step 4: 如果是多agent，生成协调员总结
    if (thread.participatingAgents.length > 1) {
      await this.generateCoordinatorSummary(thread, context);
    }

    // 标记线程完成
    thread.status = 'complete';
  }

  private showAgentTyping(
    agentType: WorkerAgentType,
    threadId: string,
    onAgentResponse?: (message: ChatMessage) => void
  ) {
    const typingMessage: ChatMessage = {
      id: generateMessageId(),
      type: 'typing',
      role: 'agent',
      content: `${WORKER_AGENTS[agentType].name}正在思考...`,
      timestamp: new Date(),
      agentType,
      agentName: WORKER_AGENTS[agentType].name,
      agentAvatar: WORKER_AGENTS[agentType].avatar,
      threadId
    };

    onAgentResponse?.(typingMessage);
  }

  private async generateCoordinatorSummary(thread: MessageThread, context: any) {
    // 显示协调员正在整理
    this.showAgentTyping('coordinator', thread.id, context.onAgentResponse);

    await new Promise(resolve => setTimeout(resolve, 1500)); // 协调员思考时间

    try {
      const responses = Object.values(thread.responses).map(msg => msg.content).join('\n\n');

      const summaryPrompt = `
用户问题: ${thread.userMessage}

各专家的建议：
${Object.entries(thread.responses).map(([agentType, message]) =>
  `${WORKER_AGENTS[agentType as WorkerAgentType].name}: ${message.content}`
).join('\n\n')}

请作为AI助手，整合以上专家建议，给出简洁明了的总结和行动建议：
1. 简要总结关键要点
2. 给出具体可行的建议
3. 如有冲突，给出平衡方案
`;

      // 这里调用LLM生成总结
      const summaryContent = await this.generateSummary(summaryPrompt);

      const summaryMessage: ChatMessage = {
        id: generateMessageId(),
        type: 'summary',
        role: 'coordinator',
        content: summaryContent,
        timestamp: new Date(),
        agentType: 'coordinator',
        agentName: 'AI助手',
        agentAvatar: WORKER_AGENTS.coordinator.avatar,
        isGroupMessage: true,
        threadId: thread.id,
        metadata: {
          participatingAgents: thread.participatingAgents
        }
      };

      thread.coordinatorSummary = summaryMessage;
      context.onComplete?.(summaryMessage);

    } catch (error) {
      console.error('Coordinator summary error:', error);
    }
  }

  private async generateSummary(prompt: string): Promise<string> {
    // 实现总结生成逻辑
    // 可以调用现有的LLM API
    return "基于各位专家的建议，我为您整理了以下要点...";
  }
}
```

### **前端群聊UI组件**

```typescript
// 群聊消息气泡组件
const GroupChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const isTyping = message.type === 'typing';
  const isSummary = message.type === 'summary';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
          {message.content}
        </div>
        <img src="/avatars/user.png" alt="You" className="w-8 h-8 rounded-full ml-2" />
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      {/* Agent头像 */}
      <img
        src={message.agentAvatar}
        alt={message.agentName}
        className={`w-8 h-8 rounded-full mr-2 ${isTyping ? 'animate-pulse' : ''}`}
      />

      <div className="flex flex-col">
        {/* Agent名称 */}
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <span>{message.agentName}</span>
          {message.agentType && (
            <span className="text-xs">
              {WORKER_AGENTS[message.agentType].emoji}
            </span>
          )}
          {message.isGroupMessage && (
            <span className="text-xs bg-gray-100 px-1 rounded">群聊</span>
          )}
        </div>

        {/* 消息内容 */}
        <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
          isSummary
            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200'
            : isTyping
            ? 'bg-gray-100 text-gray-600'
            : 'bg-gray-100'
        }`}>
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm">{message.content}</span>
            </div>
          ) : isSummary ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-purple-700">📋 综合建议</span>
              </div>
              <div className="text-sm">{message.content}</div>
            </div>
          ) : (
            <div className="text-sm">{message.content}</div>
          )}
        </div>

        {/* 时间戳 */}
        <div className="text-xs text-gray-400 mt-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
```

### **前端集成示例**

```typescript
// 在现有chat页面中集成群聊模式
const handleSendMessage = async (message: string, attachments?: any[]) => {
  if (!message.trim() || isLoading) return;

  const currentInput = message.trim();
  setUserInput('');
  setIsLoading(true);

  // 添加用户消息
  addMessage({
    type: 'text',
    role: 'user',
    content: currentInput,
  });

  // 检查生成意图或进行群聊
  const isGenerationRequest = detectGenerationIntent(currentInput, attachments && attachments.length > 0);

  if (isGenerationRequest && chatData) {
    await handleImageGeneration(currentInput);
  } else {
    await handleGroupChat(currentInput);
  }
};

const handleGroupChat = async (message: string) => {
  try {
    const coordinator = getGroupChatCoordinator();

    const result = await coordinator.processMessage(message, {
      userProfile,
      sessionMemory,
      // 实时接收agent回复
      onAgentResponse: (agentMessage) => {
        if (agentMessage.type === 'typing') {
          // 更新或添加typing消息
          addMessage(agentMessage);
          // 2秒后移除typing消息
          setTimeout(() => {
            removeMessage(agentMessage.id);
          }, 2000);
        } else {
          // 添加agent正式回复
          addMessage(agentMessage);
        }
      },
      // 接收协调员总结
      onComplete: (summaryMessage) => {
        addMessage(summaryMessage);
        setIsLoading(false);
      }
    });

    // 如果只有一个agent，直接完成
    if (result.participatingAgents.length === 1) {
      setIsLoading(false);
    }

  } catch (error) {
    addMessage({
      type: 'text',
      role: 'agent',
      content: '抱歉，我遇到了一些问题。请稍后再试。',
      agentName: 'AI助手',
      agentAvatar: '/avatars/coordinator.png'
    });
    setIsLoading(false);
  }
};
```

## 🎯 群聊模式的优势

### **用户体验优势**

1. **自然交互**: 就像真实的群聊，多个专家同时在线
2. **实时反馈**: 看到各个专家"正在输入"的状态
3. **个性化**: 每个agent有独特的头像和说话风格
4. **透明过程**: 用户能看到每个专家的独立建议

### **技术优势**

1. **并发处理**: 多个agent可以同时思考，提高响应速度
2. **无需切换**: 系统自动决定参与的agents，用户无感知
3. **扩展性强**: 新增agent只需添加配置，不影响现有流程
4. **容错性好**: 单个agent失败不影响其他agents

### **实际效果示例**

**用户**: "约会该穿什么颜色的裙子？"

**群聊界面显示**:

```
👤 用户: 约会该穿什么颜色的裙子？

📅 场合正在思考... (typing动画)
🎨 彩虹正在思考... (typing动画)
👗 小雅正在思考... (typing动画)

📅 场合: 约会是很重要的场合呢！建议选择能展现你个人魅力但不过于张扬的颜色...

🎨 彩虹: 从色彩角度来说，粉色系会给人温柔浪漫的感觉，蓝色系则显得优雅知性...

👗 小雅: 我建议选择A字裙，长度在膝盖上方5-10cm，搭配精致的小配饰...

🤝 AI助手正在整理... (typing动画)

🤝 AI助手: 📋 综合建议
根据三位专家的建议，为您的约会裙装推荐：
- 颜色首选：温柔粉色或优雅深蓝
- 款式：A字裙，膝上5-10cm
- 搭配：精致配饰 + 舒适中跟鞋
```

这种设计让多Agent系统更像真实的专家团队在为用户提供建议，用户体验更加自然和有趣！

## 🧠 记忆系统设计

### **Short-term Memory (会话记忆)**

```typescript
// 群聊模式的会话记忆，存储在内存中
interface ShortTermMemory {
  sessionId: string;
  messages: ChatMessage[];
  context: {
    userPreferences: string[];     // 用户偏好关键词
    mentionedItems: string[];      // 提到的服装单品
    currentTopic: string;          // 当前话题
    recentThreads: {               // 最近的群聊线程
      threadId: string;
      userMessage: string;
      participatingAgents: WorkerAgentType[];
      timestamp: Date;
      taskAnalysis: TaskAnalysis;
    }[];
    agentInteractions: {           // 专家交互历史
      [key in WorkerAgentType]?: {
        lastUsed: Date;
        useCount: number;
        topicTags: string[];       // 该专家处理过的话题标签
      };
    };
  };
  timestamp: Date;
}

// 群聊模式的记忆提取
const extractMemoryFromMessages = (messages: ChatMessage[]): ShortTermMemory['context'] => {
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content || '');
  const agentMessages = messages.filter(m => m.role === 'agent');
  const allText = userMessages.join(' ');

  // 提取专家交互历史
  const agentInteractions: ShortTermMemory['context']['agentInteractions'] = {};
  agentMessages.forEach(msg => {
    if (msg.agentType && msg.agentType !== 'coordinator') {
      if (!agentInteractions[msg.agentType]) {
        agentInteractions[msg.agentType] = {
          lastUsed: msg.timestamp,
          useCount: 0,
          topicTags: []
        };
      }
      agentInteractions[msg.agentType]!.useCount++;
      agentInteractions[msg.agentType]!.lastUsed = msg.timestamp;
    }
  });

  // 提取最近的线程信息
  const recentThreads = messages
    .filter(m => m.threadId && m.role === 'user')
    .slice(-5) // 保留最近5个线程
    .map(m => ({
      threadId: m.threadId!,
      userMessage: m.content || '',
      participatingAgents: [] as WorkerAgentType[], // 需要从消息中推断
      timestamp: m.timestamp,
      taskAnalysis: { mode: 'single', primaryAgent: 'style_advisor', reasoning: '' } as TaskAnalysis
    }));

  return {
    userPreferences: extractKeywords(allText, ['喜欢', '偏爱', '经常穿']),
    mentionedItems: extractKeywords(allText, ['裙子', '裤子', '上衣', '鞋子']),
    currentTopic: getLastTopic(messages),
    recentThreads,
    agentInteractions
  };
};

// 更新会话记忆（群聊模式）
const updateSessionMemory = (
  sessionMemory: ShortTermMemory,
  threadResult: {
    threadId: string;
    userMessage: string;
    participatingAgents: WorkerAgentType[];
    taskAnalysis: TaskAnalysis;
  }
): ShortTermMemory => {
  // 更新最近线程
  const newThread = {
    threadId: threadResult.threadId,
    userMessage: threadResult.userMessage,
    participatingAgents: threadResult.participatingAgents,
    timestamp: new Date(),
    taskAnalysis: threadResult.taskAnalysis
  };

  const updatedRecentThreads = [
    newThread,
    ...sessionMemory.context.recentThreads.slice(0, 4) // 保持最多5个
  ];

  // 更新专家交互历史
  const updatedAgentInteractions = { ...sessionMemory.context.agentInteractions };
  threadResult.participatingAgents.forEach(agentType => {
    if (agentType !== 'coordinator') {
      if (!updatedAgentInteractions[agentType]) {
        updatedAgentInteractions[agentType] = {
          lastUsed: new Date(),
          useCount: 1,
          topicTags: []
        };
      } else {
        updatedAgentInteractions[agentType]!.lastUsed = new Date();
        updatedAgentInteractions[agentType]!.useCount++;
      }

      // 添加话题标签
      const topicKeywords = extractTopicKeywords(threadResult.userMessage);
      updatedAgentInteractions[agentType]!.topicTags = [
        ...new Set([
          ...updatedAgentInteractions[agentType]!.topicTags,
          ...topicKeywords
        ])
      ].slice(0, 10); // 保持最多10个标签
    }
  });

  return {
    ...sessionMemory,
    context: {
      ...sessionMemory.context,
      recentThreads: updatedRecentThreads,
      agentInteractions: updatedAgentInteractions,
      currentTopic: threadResult.taskAnalysis.reasoning
    },
    timestamp: new Date()
  };
};
```

### **Long-term Memory (用户档案)**

```typescript
// 群聊模式的用户长期记忆，存储在Vercel KV
interface UserProfile {
  userId?: string;
  sessionId: string;
  profile: {
    // 基础信息
    preferredStyles: string[];     // 偏好风格
    bodyType?: string;             // 体型信息
    colorPreferences: string[];    // 颜色偏好

    // 行为数据
    frequentTopics: string[];      // 常讨论话题
    agentPreferences: {            // 专家偏好统计（群聊模式）
      [key in WorkerAgentType]?: {
        useFrequency: number;      // 使用频次
        satisfactionScore: number; // 满意度评分（1-5）
        topicAreas: string[];      // 该专家擅长的话题领域
        collaborationSuccess: {   // 协作成功率
          withAgents: WorkerAgentType[];
          successRate: number;
        }[];
      };
    };

    // 群聊相关统计
    collaborationStats: {
      singleAgentChats: number;    // 单专家对话次数
      multiAgentChats: number;     // 多专家协作次数
      averageAgentsPerChat: number; // 平均每次对话的专家数
      preferredCollaborationMode: 'single' | 'multi'; // 偏好的协作模式
    };

    generationHistory: number;     // 生成次数
    chatHistory: number;           // 聊天次数

    // 上下文
    lastInteraction: Date;
    totalSessions: number;
  };
}

// 群聊模式的档案更新
const updateUserProfile = async (
  sessionId: string,
  threadResult: {
    participatingAgents: WorkerAgentType[];
    taskAnalysis: TaskAnalysis;
    userSatisfaction?: number; // 用户满意度反馈
  }
) => {
  const existingProfile = await kv.get(`profile:${sessionId}`);
  const profile: UserProfile = existingProfile ?
    JSON.parse(existingProfile as string) :
    createDefaultProfile(sessionId);

  // 更新专家偏好统计
  const updatedAgentPreferences = { ...profile.profile.agentPreferences };

  threadResult.participatingAgents.forEach(agentType => {
    if (agentType !== 'coordinator') {
      if (!updatedAgentPreferences[agentType]) {
        updatedAgentPreferences[agentType] = {
          useFrequency: 1,
          satisfactionScore: threadResult.userSatisfaction || 4,
          topicAreas: [],
          collaborationSuccess: []
        };
      } else {
        updatedAgentPreferences[agentType]!.useFrequency++;

        // 更新满意度评分（加权平均）
        if (threadResult.userSatisfaction) {
          const current = updatedAgentPreferences[agentType]!.satisfactionScore;
          const weight = 0.2; // 新评分的权重
          updatedAgentPreferences[agentType]!.satisfactionScore =
            current * (1 - weight) + threadResult.userSatisfaction * weight;
        }
      }
    }
  });

  // 更新协作统计
  const isMultiAgent = threadResult.participatingAgents.length > 1;
  const updatedCollaborationStats = {
    ...profile.profile.collaborationStats,
    singleAgentChats: profile.profile.collaborationStats.singleAgentChats + (isMultiAgent ? 0 : 1),
    multiAgentChats: profile.profile.collaborationStats.multiAgentChats + (isMultiAgent ? 1 : 0),
    averageAgentsPerChat: calculateAverageAgentsPerChat(profile, threadResult.participatingAgents.length)
  };

  // 更新偏好的协作模式
  const totalChats = updatedCollaborationStats.singleAgentChats + updatedCollaborationStats.multiAgentChats;
  updatedCollaborationStats.preferredCollaborationMode =
    updatedCollaborationStats.multiAgentChats / totalChats > 0.6 ? 'multi' : 'single';

  const updatedProfile: UserProfile = {
    ...profile,
    profile: {
      ...profile.profile,
      agentPreferences: updatedAgentPreferences,
      collaborationStats: updatedCollaborationStats,
      chatHistory: profile.profile.chatHistory + 1,
      lastInteraction: new Date()
    }
  };

  await kv.set(`profile:${sessionId}`, JSON.stringify(updatedProfile));
  return updatedProfile;
};

// 创建默认档案（群聊模式）
const createDefaultProfile = (sessionId: string): UserProfile => ({
  sessionId,
  profile: {
    preferredStyles: [],
    colorPreferences: [],
    frequentTopics: [],
    agentPreferences: {},
    collaborationStats: {
      singleAgentChats: 0,
      multiAgentChats: 0,
      averageAgentsPerChat: 1,
      preferredCollaborationMode: 'single'
    },
    generationHistory: 0,
    chatHistory: 0,
    lastInteraction: new Date(),
    totalSessions: 1
  }
});

// 基于用户档案优化专家选择
const optimizeAgentSelection = (
  taskAnalysis: TaskAnalysis,
  userProfile: UserProfile
): TaskAnalysis => {
  const agentPrefs = userProfile.profile.agentPreferences;

  // 如果用户偏好单专家模式，尝试用单专家解决
  if (userProfile.profile.collaborationStats.preferredCollaborationMode === 'single' &&
      taskAnalysis.mode === 'multi') {

    // 找到用户最满意的专家
    const bestAgent = Object.entries(agentPrefs)
      .filter(([_, pref]) => pref.satisfactionScore > 4)
      .sort((a, b) => b[1].satisfactionScore - a[1].satisfactionScore)[0];

    if (bestAgent && taskAnalysis.collaboratingAgents?.includes(bestAgent[0] as WorkerAgentType)) {
      return {
        mode: 'single',
        primaryAgent: bestAgent[0] as WorkerAgentType,
        reasoning: `根据您的偏好，使用${bestAgent[0]}专家单独回答`
      };
    }
  }

  return taskAnalysis;
};
```

### **记忆系统在群聊中的应用**

```typescript
// 在GroupChatCoordinator中集成记忆系统
class GroupChatCoordinator {
  // ... existing code ...

  async processMessage(userMessage: string, context: {
    userProfile?: UserProfile;
    sessionMemory?: ShortTermMemory;
  }): Promise<{
    threadId: string;
    participatingAgents: WorkerAgentType[];
    taskAnalysis: TaskAnalysis;
    messages: ChatMessage[];
  }> {
    // Step 1: 分析任务，考虑用户偏好
    let taskAnalysis = await this.planner.analyzeTask(userMessage, {
      ...context,
      recentThreads: context.sessionMemory?.context.recentThreads,
      agentInteractions: context.sessionMemory?.context.agentInteractions
    });

    // Step 2: 基于用户档案优化专家选择
    if (context.userProfile) {
      taskAnalysis = optimizeAgentSelection(taskAnalysis, context.userProfile);
    }

    // Step 3: 执行群聊协作
    const threadId = generateThreadId();
    const participatingAgents = [
      taskAnalysis.primaryAgent,
      ...(taskAnalysis.collaboratingAgents || [])
    ];

    const thread: MessageThread = {
      id: threadId,
      userMessage,
      participatingAgents,
      responses: {},
      status: 'processing',
      startTime: new Date()
    };

    // Step 4: 处理并更新记忆
    const messages = await this.processAgentsInParallel(thread, context);

    // Step 5: 异步更新用户档案
    if (context.userProfile) {
      updateUserProfile(context.userProfile.sessionId, {
        participatingAgents,
        taskAnalysis,
        // userSatisfaction 可以通过后续的反馈获得
      }).catch(console.error);
    }

    return {
      threadId,
      participatingAgents,
      taskAnalysis,
      messages
    };
  }
}
```

## 📱 前端实现方案

### **在现有页面基础上扩展**

```typescript
// 在现有的 app/chat/page.tsx 中添加
const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
const [sessionMemory, setSessionMemory] = useState<ShortTermMemory | null>(null);
const [groupChatCoordinator] = useState(() => new GroupChatCoordinator());

// 扩展现有的 handleSendMessage 函数（群聊模式）
const handleSendMessage = async (message: string, attachments?: any[]) => {
  if (!message.trim() || isLoading) return;

  const currentInput = message.trim();
  setUserInput('');
  setIsLoading(true);

  // 添加用户消息
  addMessage({
    type: 'text',
    role: 'user',
    content: currentInput,
  });

  // 检查生成意图或进行群聊
  const isGenerationRequest = detectGenerationIntent(currentInput, attachments && attachments.length > 0);

  if (isGenerationRequest && chatData) {
    await handleImageGeneration(currentInput);
  } else {
    await handleGroupChat(currentInput);
  }
};

// 群聊模式的消息处理
const handleGroupChat = async (message: string) => {
  try {
    const coordinator = getGroupChatCoordinator();

    const result = await coordinator.processMessage(message, {
      userProfile,
      sessionMemory
    });

    // 实时添加所有专家回复
    result.messages.forEach((agentMessage, index) => {
      // 添加延迟以模拟真实群聊的时间差
      setTimeout(() => {
        addMessage(agentMessage);
      }, index * 500); // 每个消息间隔500ms
    });

    // 更新会话记忆
    if (sessionMemory) {
      const updatedMemory = updateSessionMemory(sessionMemory, {
        threadId: result.threadId,
        userMessage: message,
        participatingAgents: result.participatingAgents,
        taskAnalysis: result.taskAnalysis
      });
      setSessionMemory(updatedMemory);
    }

    setIsLoading(false);

  } catch (error) {
    addMessage({
      type: 'text',
      role: 'agent',
      content: '抱歉，我遇到了一些问题。请稍后再试。',
      agentName: 'AI助手',
      agentAvatar: '/avatars/coordinator.png'
    });
    setIsLoading(false);
  }
};

// 初始化用户档案和会话记忆
useEffect(() => {
  const initializeMemory = async () => {
    try {
      // 加载用户档案
      const profileResponse = await fetch(`/api/profile/${sessionId}`);
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        setUserProfile(profile);
      }

      // 初始化会话记忆
      const memory: ShortTermMemory = {
        sessionId,
        messages: [],
        context: {
          userPreferences: [],
          mentionedItems: [],
          currentTopic: '',
          recentThreads: [],
          agentInteractions: {}
        },
        timestamp: new Date()
      };
      setSessionMemory(memory);

    } catch (error) {
      console.error('Failed to initialize memory:', error);
    }
  };

  if (sessionId) {
    initializeMemory();
  }
}, [sessionId]);

// 定期更新会话记忆
useEffect(() => {
  if (sessionMemory && messages.length > 0) {
    const updatedContext = extractMemoryFromMessages(messages);
    setSessionMemory({
      ...sessionMemory,
      messages,
      context: updatedContext,
      timestamp: new Date()
    });
  }
}, [messages]);
```

### **群聊消息显示组件**

```typescript
// 更新的ChatBubble组件支持群聊模式
const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  const isAgent = message.role === 'agent';
  const isCoordinator = message.role === 'coordinator';
  const isTyping = message.type === 'typing';
  const isSummary = message.type === 'summary';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
          {message.content}
        </div>
        <img src="/avatars/user.png" alt="You" className="w-8 h-8 rounded-full ml-2" />
      </div>
    );
  }

  return (
    <div className="flex items-start mb-4">
      {/* Agent头像 */}
      <img
        src={message.agentAvatar || '/avatars/default.png'}
        alt={message.agentName || 'AI'}
        className={`w-8 h-8 rounded-full mr-2 ${isTyping ? 'animate-pulse' : ''}`}
      />

      <div className="flex flex-col">
        {/* Agent名称和标识 */}
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <span className="font-medium">{message.agentName}</span>
          {message.agentType && WORKER_AGENTS[message.agentType] && (
            <span className="text-xs">
              {WORKER_AGENTS[message.agentType].emoji}
            </span>
          )}
          {message.isGroupMessage && (
            <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">群聊</span>
          )}
          {isCoordinator && (
            <span className="text-xs bg-purple-100 text-purple-600 px-1 rounded">总结</span>
          )}
        </div>

        {/* 消息内容 */}
        <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
          isSummary
            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200'
            : isTyping
            ? 'bg-gray-100 text-gray-600'
            : isCoordinator
            ? 'bg-gradient-to-r from-blue-100 to-indigo-100'
            : 'bg-gray-100'
        }`}>
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm">{message.content}</span>
            </div>
          ) : isSummary ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-purple-700">📋 综合建议</span>
                {message.metadata?.participatingAgents && (
                  <span className="text-xs text-gray-500">
                    (基于{message.metadata.participatingAgents.length}位专家建议)
                  </span>
                )}
              </div>
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            </div>
          ) : (
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          )}
        </div>

        {/* 时间戳和处理时间 */}
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.metadata?.processingTime && (
            <span>• 处理时间: {(message.metadata.processingTime / 1000).toFixed(1)}s</span>
          )}
        </div>
      </div>
    </div>
  );
};
```

### **群聊状态指示器**

```typescript
// 群聊进行中的状态指示器
const GroupChatIndicator = ({
  participatingAgents,
  isActive
}: {
  participatingAgents: WorkerAgentType[];
  isActive: boolean;
}) => {
  if (!isActive || participatingAgents.length <= 1) return null;

  return (
    <div className="sticky top-16 z-20 px-4 py-2 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-3 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800">
                👥 {participatingAgents.length}位专家正在协作
              </span>
            </div>
            <div className="flex items-center gap-1">
              {participatingAgents.map((agentType, index) => (
                <div key={agentType} className="flex items-center">
                  <img
                    src={WORKER_AGENTS[agentType].avatar}
                    alt={WORKER_AGENTS[agentType].name}
                    className="w-6 h-6 rounded-full border border-white shadow-sm"
                  />
                  <span className="text-xs ml-1">
                    {WORKER_AGENTS[agentType].emoji}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            {participatingAgents.map(agentType => WORKER_AGENTS[agentType].name).join('、')}
            正在为您提供专业建议
          </div>
        </div>
      </div>
    </div>
  );
};
```

### **记忆系统可视化（可选）**

```typescript
// 用户档案和记忆系统的可视化组件（调试用）
const MemoryDebugPanel = ({
  userProfile,
  sessionMemory
}: {
  userProfile: UserProfile | null;
  sessionMemory: ShortTermMemory | null;
}) => {
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-xs"
      >
        调试信息
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm max-h-96 overflow-y-auto text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">记忆系统状态</h3>
        <button onClick={() => setShowDebug(false)}>✕</button>
      </div>

      {userProfile && (
        <div className="mb-4">
          <h4 className="font-semibold text-purple-600">用户档案</h4>
          <div>协作偏好: {userProfile.profile.collaborationStats.preferredCollaborationMode}</div>
          <div>单专家对话: {userProfile.profile.collaborationStats.singleAgentChats}次</div>
          <div>多专家协作: {userProfile.profile.collaborationStats.multiAgentChats}次</div>

          <h5 className="font-semibold mt-2">专家满意度</h5>
          {Object.entries(userProfile.profile.agentPreferences).map(([agent, pref]) => (
            <div key={agent}>
              {agent}: {pref.satisfactionScore.toFixed(1)}/5 ({pref.useFrequency}次)
            </div>
          ))}
        </div>
      )}

      {sessionMemory && (
        <div>
          <h4 className="font-semibold text-blue-600">会话记忆</h4>
          <div>当前话题: {sessionMemory.context.currentTopic}</div>
          <div>最近线程: {sessionMemory.context.recentThreads.length}个</div>

          <h5 className="font-semibold mt-2">专家交互</h5>
          {Object.entries(sessionMemory.context.agentInteractions).map(([agent, interaction]) => (
            <div key={agent}>
              {agent}: {interaction.useCount}次, 标签: {interaction.topicTags.slice(0, 3).join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## 🚀 实施计划

### **阶段1：群聊模式基础 (3天)**

1. 实现TaskAnalyzer（任务分析）和WorkerAgent类
2. 创建GroupChatCoordinator协调器
3. 创建 `/api/chat/agent` 端点
4. 基础测试和调试

### **阶段2：前端集成 (2天)**

1. 集成到现有handleSendMessage流程
2. 实现Agent切换UI提示
3. 添加Agent状态显示

### **阶段3：记忆系统集成 (2天)**

1. 扩展记忆系统支持agent历史
2. 用户档案中添加agent偏好统计
3. 基于历史优化agent选择

### **阶段4：优化和测试 (1天)**

1. 性能优化和错误处理
2. 用户体验优化
3. 完整测试

## 📊 成功指标

### **技术指标**

- Planner选择准确率 > 85%
- Agent响应时间 < 2秒
- 系统稳定性 > 99%

### **用户体验指标**

- Agent切换的合理性评分
- 用户对回答质量的满意度
- 多轮对话的连贯性

## 🔧 风险控制

### **技术风险**

- **LLM调用失败**: 实现fallback机制，默认使用style_advisor
- **Agent选择错误**: 允许用户手动切换agent
- **性能问题**: 缓存常用的agent选择结果

### **成本控制**

- **API调用优化**: Planner使用较低temperature减少token消耗
- **缓存策略**: 相似问题的agent选择可以缓存
- **降级方案**: 高峰期可以回退到关键词匹配

## 💡 为什么选择群聊模式？

### **优势**

1. **智能协作**: 比单一专家更全面，比复杂系统更简单
2. **可扩展**: 新增专家不需要修改核心逻辑
3. **专业性**: 每个专家专注自己的领域，提供深度建议
4. **用户体验**: 看到多个专家的独立观点，更有参与感

### **简化设计**

1. **智能分析**: TaskAnalyzer分析任务复杂度，决定参与专家
2. **并发处理**: 多个专家同时工作，提高效率
3. **独立发言**: 每个专家有独特个性，避免同质化
4. **协调总结**: AI助手整合建议，避免信息过载

这个设计既利用了LangChain的强大能力，又保持了实现的简洁性，是多Agent群聊模式的最佳实践。
