import { fetchWithTimeout, urlToFile, fileToBase64 } from "../utils";
import { GeminiAnalysisResult, geminiTask } from "./geminTask";

const GEMINI_API_URL = process.env.GEMINI_API_URL || "";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_VERSION = process.env.GEMINI_API_VERSION || 'v1beta';
const GEMINI_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL;

export interface GeminiGenerateParams {
  prompt: string;
  humanImageUrl: string;
  garmentImageUrl?: string;
  garmentImageName?: string;
  garmentImageType?: string;
}

export interface GeminiChatMessage {
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
}

export interface GeminiChatParams {
  messages: GeminiChatMessage[];
  maxOutputTokens?: number;
  temperature?: number;
}

export interface GeminiChatResult {
  text: string;
  images?: string[];
  metadata?: {
    finishReason?: string;
    tokenCount?: number;
    modelVersion?: string;
  };
}

export interface GeminiImageAnalysisParams {
  imageUrl: string;
  prompt?: string;
  maxOutputTokens?: number;
  temperature?: number;
}

export interface GeminiImageGenerationParams {
  userId: string;
  imageUrl: string;
  styleOptions: string[];
  prompt?: string;
  numImages?: number;
  maxOutputTokens?: number;
  temperature?: number;
}


export async function generateChatCompletionWithGemini(params: GeminiChatParams): Promise<GeminiChatResult> {
  console.log('🤖 [GEMINI_CHAT] ===== GEMINI CHAT API CALL STARTED =====');
  console.log('🤖 [GEMINI_CHAT] 🔧 Environment check:');
  console.log('🤖 [GEMINI_CHAT] 🔧 - MOCK_GEMINI:', process.env.MOCK_GEMINI);
  console.log('🤖 [GEMINI_CHAT] 🔧 - GEMINI_API_KEY:', GEMINI_API_KEY ? 'SET' : 'MISSING');
  console.log('🤖 [GEMINI_CHAT] 🔧 - GEMINI_IMAGE_MODEL:', GEMINI_IMAGE_MODEL);

  console.log('🤖 [GEMINI_CHAT] 📝 Input parameters:');
  console.log('🤖 [GEMINI_CHAT] 📝 - Messages count:', params.messages.length);
  console.log('🤖 [GEMINI_CHAT] 📝 - Max output tokens:', params.maxOutputTokens || 1000);
  console.log('🤖 [GEMINI_CHAT] 📝 - Temperature:', params.temperature || 0.7);

  if (process.env.MOCK_GEMINI === 'true' || !GEMINI_API_KEY) {
    console.log('🤖 [GEMINI_CHAT] 🎭 Using MOCK mode - returning mock response');
    return {
      text: "I'm a mock Gemini response. This is a test response for the fashion consultant AI assistant.",
      images: [],
      metadata: {
        finishReason: "MOCK",
        tokenCount: 0,
        modelVersion: "mock"
      }
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${GEMINI_IMAGE_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
  console.log('🤖 [GEMINI_CHAT] 🌐 API Endpoint:', endpoint.replace(GEMINI_API_KEY, '[REDACTED_KEY]'));

  const body = {
    contents: params.messages.map(msg => ({
      role: msg.role === 'system' ? 'user' : msg.role,
      parts: msg.parts
    })),
    generationConfig: {
      maxOutputTokens: params.maxOutputTokens || 2000, // 增加token限制
      temperature: params.temperature || 0.7,
    }
  };

  console.log('🤖 [GEMINI_CHAT] 📤 Sending request to Gemini API...');

  const resp = await fetchWithTimeout(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    timeout: 30000,
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error('🤖 [GEMINI_CHAT] ❌ API Error:', resp.status, text);
    throw new Error(`Gemini Chat API error: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  console.log('🤖 [GEMINI_CHAT] 📥 Received response from Gemini API');

  // Debug: summarize response structure
  try {
    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
    let textCount = 0;
    let imageCount = 0;
    const mimes = new Set<string>();
    for (const c of candidates) {
      const parts = c?.content?.parts || [];
      for (const p of parts) {
        if (typeof p?.text === 'string') textCount++;
        const inline = p?.inlineData || p?.inline_data;
        if (inline?.data) {
          imageCount++;
          if (inline?.mimeType || inline?.mime_type) mimes.add(inline.mimeType || inline.mime_type);
        }
      }
    }
    console.log('🤖 [GEMINI_CHAT] 🔎 Response summary:', { candidates: candidates.length, textParts: textCount, imageParts: imageCount, imageMimes: Array.from(mimes) });
  } catch (e) {
    console.log('🤖 [GEMINI_CHAT] (summary failed)', e);
  }

  // 解析文本和图片响应
  const candidates = data?.candidates || [];
  let responseText = '';
  const responseImages: string[] = [];

  // 提取文本内容
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts || [];
    for (const part of parts) {
      if (typeof part?.text === 'string') {
        responseText += part.text + '\n';
      }
      // 提取图片内容
      const inlineData = part?.inlineData || part?.inline_data;
      if (inlineData?.data) {
        const mimeType = inlineData.mimeType || inlineData.mime_type || 'image/jpeg';
        const imageData = `data:${mimeType};base64,${inlineData.data}`;
        responseImages.push(imageData);
        console.log('🤖 [GEMINI_CHAT] 🖼️ Found image in response');
      }
    }
  }

  // 如果没有文本响应，提供默认消息
  if (!responseText.trim()) {
    if (responseImages.length > 0) {
      responseText = "I've generated some visual content for you. Here are the results:";
    } else {
      responseText = "I'm having trouble generating a response right now. Please try again.";
    }
  }

  // 提取元数据
  const metadata = {
    finishReason: candidates[0]?.finishReason || 'UNKNOWN',
    tokenCount: data?.usageMetadata?.totalTokenCount || 0,
    modelVersion: data?.modelVersion || 'unknown'
  };

  console.log('🤖 [GEMINI_CHAT] ✅ Successfully generated chat completion');
  console.log('🤖 [GEMINI_CHAT] 📊 Results:', {
    textLength: responseText.length,
    imageCount: responseImages.length,
    finishReason: metadata.finishReason
  });

  return {
    text: responseText.trim(),
    images: responseImages,
    metadata
  };
}

export async function listAvailableModels(): Promise<any> {
  const endpoint = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models?key=${GEMINI_API_KEY}`;
  console.log('🤖 [GEMINI_MODELS] 🌐 Listing available models...');

  try {
    const resp = await fetchWithTimeout(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('🤖 [GEMINI_MODELS] ❌ Error listing models:', resp.status, text);
      return null;
    }

    const data = await resp.json();
    console.log('🤖 [GEMINI_MODELS] 📋 Available models:', data);
    return data;
  } catch (error) {
    console.error('🤖 [GEMINI_MODELS] ❌ Error listing models:', error);
    return null;
  }
}


// Outfit Check 对上传的图片进行分析
export async function analyzeImageWithGemini(userId: string, analysisPrompt: string, imageBase64: string, imageMimeType: string): Promise<GeminiAnalysisResult> {
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] ===== GEMINI IMAGE ANALYSIS STARTED =====');
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔧 Environment check:');
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔧 - MOCK_GEMINI:', process.env.MOCK_GEMINI);
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔧 - GEMINI_API_KEY:', GEMINI_API_KEY ? 'SET' : 'MISSING');
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔧 - GEMINI_IMAGE_MODEL:', GEMINI_IMAGE_MODEL);

  if (process.env.MOCK_GEMINI === 'true' || !GEMINI_API_KEY) {
    console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🎭 Using MOCK mode - returning mock analysis');
    throw new Error('🤖 [GEMINI_IMAGE_ANALYSIS] 🎭 Using MOCK mode - returning mock analysis');
  }

  // List available models for debugging
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔍 Listing available models for debugging...');
  // await listAvailableModels();

  // Default fashion analysis prompt in English
  const defaultPrompt = `Please analyze the outfit style in this image, including:
1. Clothing type and style (formal, casual, trendy, etc.)
2. Color coordination analysis
3. Overall styling strengths and weaknesses
4. Improvement suggestions and styling advice
5. Suitable occasions
Please respond in English with a professional and friendly tone.`;

  const prompt = analysisPrompt || defaultPrompt;

  // // 将图片URL转换为base64
  // console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔄 Converting image to base64...');
  // const imageBase64 = await urlToFile(imageUrl, 'image.jpg', 'image/jpeg').then(fileToBase64);
  console.log('🤖 [GEMINI_IMAGE_ANALYSIS] 🔄 Image converted, size:', imageBase64.length, 'chars');


  const result = await geminiTask(userId, prompt, imageBase64, imageMimeType);
  return result;
}


export async function generateStyledImagesWithGemini(params: GeminiImageGenerationParams): Promise<string[]> {
  console.log('🤖 [GEMINI_IMAGE_GENERATION] ===== GEMINI IMAGE GENERATION STARTED =====');
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔧 Environment check:');
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔧 - MOCK_GEMINI:', process.env.MOCK_GEMINI);
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔧 - GEMINI_API_KEY:', GEMINI_API_KEY ? 'SET' : 'MISSING');
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔧 - GEMINI_IMAGE_MODEL:', GEMINI_IMAGE_MODEL);

  console.log('🤖 [GEMINI_IMAGE_GENERATION] 📝 Input parameters:');
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 📝 - Image URL:', params.imageUrl?.substring(0, 100) + '...');
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 📝 - Style options:', params.styleOptions);
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 📝 - Number of images:', params.numImages || 3);
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 📝 - Custom prompt:', params.prompt || 'Using default generation prompt');

  if (process.env.MOCK_GEMINI === 'true' || !GEMINI_API_KEY) {
    console.log('🤖 [GEMINI_IMAGE_GENERATION] 🎭 Using MOCK mode - returning mock images');
    const mockImages = Array(params.numImages || 3).fill("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77hQAAAABJRU5ErkJggg==");
    return mockImages;
  }

  // Build generation prompt based on style options
  const defaultPrompt = `Generate ${params.numImages || 3} different styled outfit variations based on the uploaded image and the following style options: ${params.styleOptions.join(', ')}. 

Each image should showcase a different style interpretation while maintaining the core outfit structure. Focus on:
- Color variations and palette changes
- Accessory modifications and additions
- Styling details and finishing touches
- Overall aesthetic differences
- Fabric and texture variations
- Silhouette adjustments

Make each image unique, fashionable, and true to the selected style aesthetic.`;

  const generationPrompt = params.prompt || defaultPrompt;

  // Convert image URL to base64
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔄 Converting image to base64...');
  const imageBase64 = await urlToFile(params.imageUrl, 'image.jpg', 'image/jpeg').then(fileToBase64);
  console.log('🤖 [GEMINI_IMAGE_GENERATION] 🔄 Image converted, size:', imageBase64.length, 'chars');
  const result = await geminiTask(params.userId, generationPrompt, imageBase64, "image/jpeg");

  return result.images;
}


