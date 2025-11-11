import { ArrayRowLabelArgs } from './types'

/**
 * Utility function to create a custom row label configuration for array fields.
 *
 * Usage:
 * ```ts
 * import { customRowLabel } from '@/fields/array-row-label/utility'
 * 
 * ...
 *  {
      name: 'testArray',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        // Custom row label configuration
        ...customRowLabel({ fieldToUse: 'title' }),
      },
    },
 * 
 * ```
 */
export const customRowLabel = ({
  fieldToUse,
  template = false,
  fallbackLabel,
}: ArrayRowLabelArgs) => {
  return {
    components: {
      RowLabel: {
        path: '@/fields/array-row-label',
        clientProps: {
          fieldToUse,
          template: Boolean(template),
          fallbackLabel: fallbackLabel,
        },
      },
    },
  }
}
