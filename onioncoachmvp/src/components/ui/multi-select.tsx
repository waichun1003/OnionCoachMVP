"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { label: string; value: string; }[];
  placeholder?: string;
}

export function MultiSelect({ value, onChange, options, placeholder }: MultiSelectProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <div 
            key={item}
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center gap-1"
          >
            <span>{options.find(opt => opt.value === item)?.label || item}</span>
            <X 
              className="h-4 w-4 cursor-pointer hover:text-orange-900"
              onClick={() => onChange(value.filter(v => v !== item))}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredOptions.map((opt) => (
          <div
            key={opt.value}
            onClick={() => {
              const newValue = value.includes(opt.value)
                ? value.filter(v => v !== opt.value)
                : [...value, opt.value]
              onChange(newValue)
            }}
            className={`p-3 rounded-lg cursor-pointer border transition-colors ${
              value.includes(opt.value)
                ? 'bg-[#E86C3A] text-white border-[#E86C3A]'
                : 'bg-white hover:bg-orange-50 border-gray-200'
            }`}
          >
            {opt.label}
          </div>
        ))}
      </div>
      {placeholder && value.length === 0 && (
        <p className="text-gray-500 text-sm">{placeholder}</p>
      )}
    </div>
  )
} 