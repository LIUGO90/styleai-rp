"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  OnboardingData,
  loadCompleteOnboardingData,
  saveOnboardingData,
  saveUserProfile,
} from "@/lib/onboarding-storage";

// Import step components
import PhotoUploadStep from "../components/onboarding/photo-upload-step";
import BodyAnalysisStep from "../components/onboarding/body-analysis-step";
import StylePreferenceStep from "../components/onboarding/style-preference-step";
import StyleSummaryStep from "../components/onboarding/style-summary-step";
import OnBoardingZero from "../components/onboarding/on-boarding-zero";
import OnBoardingFirst from "../components/onboarding/on-boarding-first";
import OnBoardingTwo from "../components/onboarding/on-boarding-two";
import OnBoardingThree from "../components/onboarding/on-boarding-three";
import OnBoardingFour from "../components/onboarding/on-boarding-four";
import OnBoardingFive from "../components/onboarding/on-boarding-five";
import OnBoardingSix from "../components/onboarding/on-boarding-six";


const TOTAL_STEPS = 8;

// Disable static generation for this page
export const dynamic = 'force-dynamic';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isStepValid, setIsStepValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Load saved data on mount with improved loading
  useEffect(() => {
    const completeData = loadCompleteOnboardingData();
    setOnboardingData(completeData);
  }, []);

  // Save data whenever it changes with error handling
  useEffect(() => {
    if (Object.keys(onboardingData).length > 0) {
      saveOnboardingData(onboardingData);
    }
  }, [onboardingData]);

  // Memoize the update callback to prevent infinite re-renders
  const updateOnboardingData = useCallback((stepData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...stepData }));
  }, []);

  // Memoize the validation callback to prevent infinite re-renders
  const handleValidationChange = useCallback((isValid: boolean) => {
    setIsStepValid(isValid);
  }, []);

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding with improved error handling
      try {
        setIsSaving(true);
        localStorage.setItem("styleMe_onboarding_completed", "true");

        // Save user profile using the utility function (local storage)
        const profileSaved = saveUserProfile(onboardingData);

        if (!profileSaved) {
          console.warn("Failed to save complete user profile to local storage, but continuing...");
        }

        // Save to database if user is authenticated
        if (session?.user && (session.user as { id?: string }).id) {
          try {
            const response = await fetch('/api/user/profile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                onboardingData: onboardingData,
              }),
            });

            if (!response.ok) {
              console.warn("Failed to save user profile to database:", response.statusText);
            } else {
              console.log("User profile saved to database successfully");
            }
          } catch (error) {
            console.error("Error saving user profile to database:", error);
          }
        } else {
          console.log("User not authenticated, skipping database save");
        }

        router.push("/");
      } catch (error) { 
        console.error("Error completing onboarding:", error);
        // Still try to navigate even if storage fails
        router.push("/");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }else{
      router.push("/my-style");
    }
  };

  const handleSkip = () => {
    // No optional steps remaining
    handleNext();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnBoardingZero
            onValidationChange={handleValidationChange}
          />
        );
      case 1:
        return (
          <OnBoardingFirst
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 2:
        return (
          <OnBoardingTwo
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 3:
        return (
          <OnBoardingThree
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 4:
        return (
          <OnBoardingFour
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 5:
        return (
          <OnBoardingFive
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 6:
        return (
          <OnBoardingSix
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      case 7:
        return (
          <StyleSummaryStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onValidationChange={handleValidationChange}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = [
      "Photo Upload", // Step 0
      "Body Analysis", // Step 1
      "Style Preference", // Step 2
      "Style Summary", // Step 3
    ];
    return titles[currentStep];
  };

  const getStepEmoji = () => {
    const emojis = ["📸", "💪", "🎨", "✨"];
    return emojis[currentStep];
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 relative pb-32">
      {/* New Simplified Header with Pagination Dots */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            // disabled={currentStep === 0}
            className="p-2 h-auto disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Pagination Dots */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentStep === index ? "bg-pink-500 w-4" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Skip Button (or placeholder) */}
          <div className="w-14 text-right">
            {/* No skip button needed since no optional steps */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">{renderCurrentStep()}</div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-100 p-6">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={!isStepValid || isSaving}
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50"
          >
            <span className="flex items-center justify-center space-x-2">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === TOTAL_STEPS - 1 ? "Complete Setup" : "Continue"}</span>
                  {currentStep < TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
