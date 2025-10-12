'use client'
import {
  FieldDescription,
  FieldError,
  FieldLabel,
  TextInput,
  useField,
  useTranslation,
} from '@payloadcms/ui'
import { DefaultCellComponentProps, TextFieldClient, TextFieldClientProps } from 'payload'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './style.scss'
import { ColorPickerProps } from './types'

const ColorPicker: React.FC<TextFieldClientProps & ColorPickerProps> = ({
  path,
  field,
  colorPresets,
  debounceDelay = 300,
  showTextInput,
  readOnly,
}) => {
  const { setValue, value, disabled, showError } = useField<string>({ path: path || field.name })
  const [localValue, setLocalValue] = useState(value || '')
  const colorInputRef = useRef<HTMLInputElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const actualReadOnly = readOnly || field.admin?.readOnly || false

  // Sync external value changes to local state
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value || '')
    }
  }, [value])

  // Debounced value update
  const debouncedSetValue = useCallback(
    (newValue: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        setValue(newValue)
      }, debounceDelay)
    },
    [setValue, debounceDelay],
  )

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setLocalValue(newColor)
    debouncedSetValue(newColor)
  }

  const handlePresetClick = (color: string) => {
    if (actualReadOnly) return
    setLocalValue(color)
    setValue(color) // Immediate update for preset clicks
    if (colorInputRef.current) {
      colorInputRef.current.value = color
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = e.target.value

    // Auto-add # if missing
    if (newColor && !newColor.startsWith('#')) {
      newColor = `#${newColor}`
    }

    setLocalValue(newColor)
    //Update value with debounce, validation will handle incorrect formats
    debouncedSetValue(newColor)
  }

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(localValue)

  return (
    <div className="color-picker">
      <FieldLabel
        label={field.label}
        localized={field.localized}
        path={path}
        required={field.required}
      />
      <div className="color-picker__main">
        <div className="color-picker__input-group">
          <input
            ref={colorInputRef}
            type="color"
            id={`color-${field.name}`}
            className="color-picker__color-input"
            value={isValidHex ? localValue : '#000000'}
            onChange={handleColorChange}
            disabled={actualReadOnly}
          />
          {showTextInput && (
            <TextInput
              value={localValue}
              onChange={handleTextInputChange}
              placeholder="#000000"
              readOnly={actualReadOnly || disabled}
              path={path} // Provide path for Payload's form handling
              required={field.required}
            />
          )}
        </div>

        {!isValidHex && localValue && (
          <div className="color-picker__error">Invalid hex color format</div>
        )}
        <FieldError showError={showError} path={path} />
      </div>

      {colorPresets && colorPresets.length > 0 && (
        <div
          className={`color-picker__presets ${actualReadOnly || disabled ? 'color-picker__presets--disabled' : ''}`}
        >
          <div className="color-picker__presets-label">Presets:</div>
          <div className="color-picker__presets-grid">
            {colorPresets.map((color, index) => (
              <button
                key={`${color}-${index}`}
                type="button"
                className={`color-picker__preset ${
                  localValue.toLowerCase() === color.toLowerCase()
                    ? 'color-picker__preset--active'
                    : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetClick(color)}
                disabled={actualReadOnly || disabled}
                title={color}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}

export const ColorCell: React.FC<DefaultCellComponentProps<TextFieldClient>> = (props) => {
  const { cellData, field } = props
  const { i18n } = useTranslation()

  return (
    <div className="color-cell">
      {cellData && <div style={{ backgroundColor: cellData }} className="cell-indicator" />}
      <span>
        {cellData
          ? cellData
          : i18n.t('general:noLabel', {
              //Using field name, to prevent requiring "@payloadcms/translations"
              //As ShadcnCLI will install latest version, which may be incompatible with Payload's version

              //You can replace it with `getTranslation(('label' in field ? field.label : null) || 'data', i18n),`
              //And install "@payloadcms/translations" with same version as Payload, to get the actual localized label
              label: field.name,
            })}
      </span>
    </div>
  )
}

export default ColorPicker
