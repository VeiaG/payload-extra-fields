"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ColorPickerDemo() {
  const [color, setColor] = useState("#4ECDC4")
  const [localValue, setLocalValue] = useState("#4ECDC4")

  const colorPresets = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ]

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    setLocalValue(newColor)
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value

    if (newColor && !newColor.startsWith("#")) {
      newColor = `#${newColor}`
    }

    setLocalValue(newColor)

    if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      setColor(newColor)
    }
  }

  const handlePresetClick = (presetColor: string) => {
    setColor(presetColor)
    setLocalValue(presetColor)
  }

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(localValue)

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="color-picker">Theme Color</Label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="color-picker"
            value={isValidHex ? color : "#000000"}
            onChange={handleColorChange}
            className="w-12 h-12 rounded-md border-2 border-input cursor-pointer"
          />
          <div className="flex-1">
            <Input
              value={localValue}
              onChange={handleTextInputChange}
              placeholder="#000000"
              className={!isValidHex && localValue ? "border-red-500" : ""}
            />
          </div>
        </div>
        {!isValidHex && localValue && (
          <p className="text-sm text-red-500">Invalid hex color format</p>
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label>Presets</Label>
        <div className="grid grid-cols-8 gap-2">
          {colorPresets.map((presetColor, index) => (
            <button
              key={`${presetColor}-${index}`}
              type="button"
              onClick={() => handlePresetClick(presetColor)}
              className={`w-10 h-10 rounded-md border-2 transition-all hover:scale-110 ${
                color.toLowerCase() === presetColor.toLowerCase()
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-input"
              }`}
              style={{ backgroundColor: presetColor }}
              title={presetColor}
              aria-label={`Select color ${presetColor}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
