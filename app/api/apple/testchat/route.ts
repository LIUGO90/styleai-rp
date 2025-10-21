import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Job } from '@/lib/types';
import { generateChatCompletionWithGemini, GeminiChatMessage } from '@/lib/apple/gemini';
import { fileToBase64, urlToFile } from '@/lib/utils';
import { checkAndIncrementLimit } from '@/lib/apple/checkLimit';



interface TestChatRequest {
    userId: string;
    sessionId?: string;
    messages: GeminiChatMessage[];
}


/**
 * 只作为测试接口，用于测试Gemini API
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest) {


    try {
        const body: TestChatRequest = await request.json();
        const { userId,messages,sessionId } = body;


        console.log(`[Chat API] Sending request to Gemini with ${messages.length} messages`);

        // Call Gemini API
        const aiResponse = await generateChatCompletionWithGemini(userId, {
            messages: messages,
            maxOutputTokens: 1000,
            temperature: 0.7,
        });

        // Return response
        return NextResponse.json({
            success: true,
            message: aiResponse,
            sessionId: sessionId,
        });

    } catch (error) {
        console.error('[Chat API] Error processing chat request:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process chat request',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
