"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OnboardingData } from "@/lib/onboarding-storage";

interface ScenarioStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const SCENARIOS = [
  {
    id: "work",
    label: "Work/Professional",
    emoji: "💼",
    description: "Office meetings, presentations, business socials",
  },
  {
    id: "date",
    label: "Social & Dating",
    emoji: "💕",
    description: "Dinner dates, parties, social events",
  },
  { id: "casual", label: "Daily Casual", emoji: "☀️", description: "Everyday outings, coffee dates, weekend trips" },
  {
    id: "special",
    label: "Special Events",
    emoji: "✨",
    description: "Weddings, dinners, important occasions",
  },
  {
    id: "travel",
    label: "Travel/Vacation",
    emoji: "🌴",
    description: "Tourism, sightseeing, vacation activities",
  },
  {
    id: "creative",
    label: "Creative Expression",
    emoji: "🎨",
    description: "Art events, creative work, self-expression",
  },
];

export default function ScenarioStep({ data, onUpdate, onValidationChange }: ScenarioStepProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>(data.primaryScenario || "");
  const [customScenario, setCustomScenario] = useState(data.customScenario || "");
  const isInitialMount = useRef(true);

  // Check validation whenever relevant state changes
  useEffect(() => {
    const isValid = selectedScenario !== "" || customScenario.trim() !== "";
    onValidationChange(isValid);
  }, [selectedScenario, customScenario, onValidationChange]);

  // Update parent data whenever relevant state changes
  useEffect(() => {
    // Skip the initial render to avoid immediate update on mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onUpdate({
      primaryScenario: selectedScenario,
      customScenario,
    });
  }, [selectedScenario, customScenario, onUpdate]);

  const selectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Usage Scenarios</h2>
        <p className="text-gray-600">Clarify the context of your needs to enhance style practicality.</p>
      </div>

      {/* Scenario Options */}
      <div className="space-y-3">
        {SCENARIOS.map((scenario) => (
          <Card
            key={scenario.id}
            className={`p-4 cursor-pointer transition-all ${selectedScenario === scenario.id
              ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 shadow-md"
              : "border-gray-200 hover:border-pink-200"
              }`}
            onClick={() => selectScenario(scenario.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{scenario.emoji}</div>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${selectedScenario === scenario.id ? "text-pink-800" : "text-gray-800"}`}
                >
                  {scenario.label}
                </h3>
                <p
                  className={`text-sm ${selectedScenario === scenario.id ? "text-pink-600" : "text-gray-600"}`}
                >
                  {scenario.description}
                </p>
              </div>
              {selectedScenario === scenario.id && (
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Custom Scenario Input */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">🎯 Or describe your specific needs</h3>
        <Input
          placeholder="e.g., Job interview, mom's daily life, student activities..."
          value={customScenario}
          onChange={(e) => setCustomScenario(e.target.value)}
          className="text-sm"
        />
      </Card>
    </div>
  );
}
