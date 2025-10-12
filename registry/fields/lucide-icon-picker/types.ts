import { TextField } from 'payload'

export type IconData = {
  name: string
  categories: string[]
  tags: string[]
}

export type IconPickerArgs = {
  /**
   * The name of the field.
   * @default 'icon'
   */
  name?: string
  /**
   * Required field indicator.
   * @default false
   */
  required?: boolean

  /**
   * A description for the admin UI
   * Same as `admin.description` in a standard Payload field
   */
  description?: string

  /**
   * Whether to show the text input alongside the icon picker.
   * @default true
   */
  showTextInput?: boolean

  /**
   * Whether to enable search functionality
   * @default true
   */
  searchable?: boolean

  /**
   * Whether to show category filters
   * @default true
   */
  categorized?: boolean

  /**
   * Search input placeholder
   * @default 'Search icons...'
   */
  searchPlaceholder?: string

  /**
   * Button placeholder text
   * @default 'Select Icon'
   */
  triggerPlaceholder?: string

  /**
   * A function used to override field at a granular level.
   */
  overrides?: (field: TextField) => TextField
}

export type IconPickerProps = Pick<
  IconPickerArgs,
  'showTextInput' | 'searchable' | 'categorized' | 'searchPlaceholder' | 'triggerPlaceholder'
>
