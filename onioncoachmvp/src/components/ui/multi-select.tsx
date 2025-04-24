"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: (Option | string)[];
  placeholder?: string;
}

export function MultiSelect({ value, onChange, options, placeholder }: MultiSelectProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )

  const filteredOptions = normalizedOptions.filter(opt => 
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
        {value.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1 bg-[#E86C3A]/10 text-[#E86C3A] px-2 py-1 rounded-md"
          >
            <span className="text-sm">{item}</span>
            <button
              type="button"
              onClick={() => onChange(value.filter(i => i !== item))}
              className="hover:bg-[#E86C3A]/20 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-1 outline-none bg-transparent min-w-[120px]"
          placeholder={value.length === 0 ? placeholder : "Add more..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-50">
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                value.includes(option.value) ? 'bg-gray-50' : ''
              }`}
              onClick={() => {
                if (!value.includes(option.value)) {
                  onChange([...value, option.value])
                }
                setSearchQuery("")
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 