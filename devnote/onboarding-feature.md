# 🎯 Feature Request: 用户 Onboarding 流程 - AI Styling App

## 🧩 背景简介

本功能旨在设计并实现 AI Styling App 的初始用户 Onboarding 流程，通过**最少的用户输入**，获取生成穿搭建议所需的关键信息。目标是在保留核心用户画像维度的前提下，确保流程**高效、友好、视觉简洁**，为 AI 提供可靠的风格推荐输入基础。

---

## 🧭 Feature 概览

| 项目       | 内容 |
|------------|------|
| Feature 名 | AI Styling 用户 Onboarding 流程 |
| 目标       | 以最少步骤收集穿搭建议所需的核心主观信息（P0 级别字段） |
| 输出       | 结构化用户画像数据 `UserStyleProfile`（供 AI 风格推荐模块使用） |
| 涉及模块   | UI 设计、前端收集逻辑、图像识别接口、AI Prompt 输入结构 |

---

## 📥 Onboarding 步骤总览（共 6 步）

| Step | 页面主题 | 用户任务 | 收集字段 |
|------|----------|----------|-----------|
| 0 | 上传照片 | 上传正面全身照 + 头部近照（用于AI识别） | `body_shape`, `face_shape`, `skin_tone` 等（自动识别） |
| 1 | 身体优势/劣势 | 勾选身体想要强调和遮掩的部位 | `strengths`, `weaknesses` |
| 2 | 想成为谁 | 选择目标气质风格（图文卡片） | `target_vibe` |
| 3 | 穿搭场景 | 选择本次搭配的主要使用场景 | `primary_use_scene` |
| 4 | 禁忌雷区 | 勾选不接受的穿搭元素 | `style_taboo` |
| 5 | 个性偏好（可跳过） | 勾选是否偏好环保/品牌/配饰建议等 | `prefer_sustainable_fashion`, `style_keywords`, `want_makeup_hair_suggestions` |

---

## 📦 字段采集逻辑

字段按**是否可由图像识别自动填充**，分为：

### ✅ Required 字段（必须问用户）

- `strengths`：身体优势（主观判断）
- `weaknesses`：身体弱项（主观判断）
- `target_vibe`：想要呈现的气质风格
- `primary_use_scene`：主要穿搭场景
- `style_taboo`：穿搭禁忌（如不能穿高跟）

### 🧠 Optional 字段（可由图像识别补全）

- `body_shape`, `face_shape`, `skin_tone`, `height_cm`, `weight_kg`
- `style_keywords`, `prefer_sustainable_fashion`, `want_makeup_hair_suggestions`

---

## 🧑‍🎨 UI 设计建议

- 每页仅 1~2 个问题，避免信息过载
- 多使用按钮 + 图示选项卡，减少文字输入
- 自动识别的字段在 UI 上显示“已识别，您可以修改”
- 可跳过页面提供“稍后完善”机制，降低流失率

---

## 📤 输出格式参考（UserStyleProfile）

\`\`\`json
{
  "strengths": ["腿长", "腰细"],
  "weaknesses": ["胯宽"],
  "target_vibe": "清新少女",
  "primary_use_scene": "通勤",
  "style_taboo": ["无袖", "高领"],
  "prefer_sustainable_fashion": true,
  "want_makeup_hair_suggestions": false
}
