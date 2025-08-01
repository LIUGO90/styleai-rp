"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OnboardingData } from "@/lib/onboarding-storage";
import { StepProps } from "./on-boarding-step";

// 圆圈循环动画组件
const CircleLoadingAnimation = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* 主圆圈动画 */}
      <div className="relative">
        {/* 外圈旋转 */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#FF6EC7] rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        
        {/* 内圈脉冲 */}
        <div className="absolute inset-2 w-12 h-12 border-2 border-[#00C2FF] rounded-full animate-ping opacity-60" style={{ animationDuration: '2s' }}></div>
        
        {/* 中心点 */}
        <div className="absolute inset-4 w-8 h-8 bg-gradient-to-br from-[#FF6EC7] to-[#D5F500] rounded-full animate-pulse" style={{ animationDuration: '1s' }}></div>
      </div>
      
      {/* 装饰性小圆圈 */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-[#FF6EC7] rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.2s' }}></div>
        <div className="w-2 h-2 bg-[#00C2FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}></div>
        <div className="w-2 h-2 bg-[#D5F500] rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.2s' }}></div>
      </div>
    </div>
  );
};


export default function OnBoardingFour({ data,
    onUpdate,
    onValidationChange,
}: StepProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    
    useEffect(() => {
        if (data.aiAnalysis) {
            setAnalysisComplete(true);
        }
    }, [data.fullBodyPhoto, data.aiAnalysis]);
    // New function to call the backend API for analysis
    const runAIAnalysis = useCallback(async () => {
        if (isAnalyzing || analysisComplete || !data.fullBodyPhoto) return;

        setIsAnalyzing(true);
        setAnalysisError(null);

        try {
            const response = await fetch("/api/analyze-photos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullBodyPhoto: data.fullBodyPhoto }),
            });

            if (!response.ok) {
                throw new Error("Failed to get analysis from server.");
            }

            const result = await response.json();

            if (result.aiAnalysis) {
                onUpdate({
                    aiAnalysis: result.aiAnalysis,
                });
                setAnalysisComplete(true);
            } else {
                throw new Error("Invalid analysis data received.");
            }
        } catch (error) {
            console.error("AI Analysis failed:", error);
            setAnalysisError(
                "Sorry, we couldn't analyze the photo. Please try again or use a different image.",
            );
        } finally {
            setIsAnalyzing(false);
        }
    }, [ onUpdate, isAnalyzing, analysisComplete]);


    // Handle validation and trigger analysis
    useEffect(() => {
        const isValid = Boolean(data.fullBodyPhoto);
        onValidationChange(isValid);

        // Automatically trigger analysis once photo is uploaded and there's no error
        if (isValid && !analysisComplete && !isAnalyzing && !analysisError) {
            runAIAnalysis();
        }
    }, [
        data.fullBodyPhoto,
        onValidationChange,
        analysisComplete,
        isAnalyzing,
        analysisError,
        runAIAnalysis,
    ]);
    
    return (
        <div className="space-y-6">
            <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Building your style profile...
                </h2>
                <p className="text-gray-600">
                    Dress Confidently & Shop Smartly
                </p>
                
                {/* 显示圆圈循环动画 */}
                <CircleLoadingAnimation isVisible={isAnalyzing || (!analysisComplete && Boolean(data.fullBodyPhoto))} />
                
                {/* 错误信息显示 */}
                {analysisError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{analysisError}</p>
                    </div>
                )}
                
                {/* 分析完成状态 */}
                {analysisComplete && !isAnalyzing && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-600 text-sm">✓ Style analysis completed successfully!</p>
                    </div>
                )}
            </div>
        </div>
    )
}