import { TextField } from 'payload'
import { ColorPickerArgs } from './types'
import { text } from 'payload/shared'

export const colorField = (options?: ColorPickerArgs): TextField => {
  const baseField: TextField = {
    name: options?.name || 'color',
    type: 'text',
    required: options?.required || false,
    admin: {
      description: options?.description,
      components: {
        Field: {
          path: '@/fields/color-picker',
          clientProps: {
            colorPresets: options?.colorPresets || [],
            debounceDelay: options?.debounceDelay || 300,
            showTextInput: options?.showTextInput !== false, // default true
          },
        },
        Cell: {
          path: '@/fields/color-picker#ColorCell',
          clientProps: {},
        },
      },
    },
    validate: (value, args) => {
      if (value && !/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
        return 'Invalid color format'
      }
      //Reuse Payload's built-in text validation
      return text(value, args)
    },
  }
  if (typeof options?.overrides === 'function') {
    return options.overrides(baseField)
  }

  return baseField
}
