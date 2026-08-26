"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface QuantityStepperProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
}

export function QuantityStepper({ initialValue = 1, min = 1, max = 10, onChange }: QuantityStepperProps) {
  const [value, setValue] = useState(initialValue);

  const handleDecrease = () => {
    if (value > min) {
      const newVal = value - 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      const newVal = value + 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  return (
    <div className="flex items-center border border-border rounded-md w-32 h-10">
      <button 
        onClick={handleDecrease}
        disabled={value <= min}
        className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-gray-100 disabled:opacity-50 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="flex-1 h-full flex items-center justify-center font-semibold text-sm border-x border-border">
        {value}
      </div>
      <button 
        onClick={handleIncrease}
        disabled={value >= max}
        className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-gray-100 disabled:opacity-50 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
