import { TextField } from 'payload'
import { IconPickerArgs } from './types'

export const iconField = (options?: IconPickerArgs): TextField => {
  const baseField: TextField = {
    name: options?.name || 'icon',
    type: 'text',
    required: options?.required || false,
    admin: {
      description: options?.description,
      components: {
        Field: {
          path: '@/fields/lucide-icon-picker',
          clientProps: {
            showTextInput: !!options?.showTextInput, // default false
            searchable: options?.searchable !== false, // default true
            categorized: options?.categorized !== false, // default true
            searchPlaceholder: options?.searchPlaceholder || 'Search icons...',
            triggerPlaceholder: options?.triggerPlaceholder || 'Select Icon',
          },
        },
        Cell: {
          path: '@/fields/lucide-icon-picker#IconCell',
          clientProps: {},
        },
      },
    },
  }
  if (typeof options?.overrides === 'function') {
    return options.overrides(baseField)
  }

  return baseField
}
