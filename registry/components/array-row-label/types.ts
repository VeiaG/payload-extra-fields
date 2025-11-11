export type ArrayRowLabelArgs = {
  /**
   * The field in the array item to use for the label
   * You can use dot notation for nested fields (e.g. 'nested.fieldName')
   *
   * And you can use {{variable}} syntax to include other values (e.g. 'Item {{index}} - {{fieldName}}')
   * Pass `true` to the template option to enable this feature
   */
  fieldToUse: string
  /**
   * Whether to treat the fieldToUse as a template string
   * Enables the use of {{variable}} syntax
   *
   * You can also use this varibles in template:
   * - {{index}} - The current index of the row (starting from 0)
   *
   * Pass `true` to the template option to enable this feature
   * @default false
   */
  template?: boolean
  /**
   *  Fallback label if the specified field is not found or is empty
   *  @default 'Item {{index}}'
   */
  fallbackLabel?: string
}
