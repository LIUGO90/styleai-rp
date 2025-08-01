"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef, useCallback } from "react";
import { OnboardingData } from "@/lib/onboarding-storage";
import { StepProps } from "./on-boarding-step";



const chooseTitles = [
    "Photo Get new outfit ideas of my clothes",
    "Body Elevate my outfits to look better",
    "Develop my personal style",
    "Discover My erfect Colors & Flattering Silhouettes",
    "Create outfit for special event",
    "Buy less and shop smarter"
];

export default function OnBoardingTwo({
    data,
    onUpdate,
    onValidationChange }: StepProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Initialize selectedOptions from data
    useEffect(() => {
        if (data.stylePreferences && data.stylePreferences.length > 0) {
            setSelectedOptions(data.stylePreferences);
        }
        setIsInitialized(true);
    }, [data.stylePreferences]);
    
    // Update validation when selection changes
    useEffect(() => {
        if (isInitialized) {
            onValidationChange(selectedOptions.length > 0);
            onUpdate({ stylePreferences: selectedOptions });
        }
    }, [selectedOptions, isInitialized]);

    const handleOptionChange = (option: string, checked: boolean) => {
        if (checked) {
            setSelectedOptions(prev => [...prev, option]);
        } else {
            setSelectedOptions(prev => prev.filter(item => item !== option));
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                    What’d you like Styli to focus on?
                </h2>

            </div>

            <div className="flex justify-left">
                <div className="space-y-3">
                    {chooseTitles.map((title, index) => (
                        <div className="flex items-center space-x-2" key={title}>
                            <Checkbox
                                id={title}
                                checked={selectedOptions.includes(title)}
                                onCheckedChange={(checked) => handleOptionChange(title, checked as boolean)}
                            />
                            <Label htmlFor={title} className="text-lg">{title}</Label>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}