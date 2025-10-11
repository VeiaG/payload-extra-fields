import { TextField } from 'payload'

export type ColorPickerArgs = {
  /**
   * The name of the field.
   * @default 'color'
   */
  name?: string
  /**
   * Required field indicator.
   * @default false
   */
  required?: boolean
  /**
   * An array of color presets to choose from.
   */
  colorPresets?: string[]
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceDelay?: number

  /**
   * A description for the admin UI
   * Same as `admin.description` in a standard Payload field
   */
  description?: string

  /**
   * Whether to show the text input alongside the color picker.
   * @default true
   */
  showTextInput?: boolean
  /**
   * A function used to override fields at a granular level.
   */
  overrides?: (field: TextField) => TextField
}

export type ColorPickerProps = Pick<
  ColorPickerArgs,
  'colorPresets' | 'debounceDelay' | 'showTextInput'
>
