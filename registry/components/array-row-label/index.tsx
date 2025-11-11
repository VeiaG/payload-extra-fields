'use client'
import { useRowLabel } from '@payloadcms/ui'
import { ArrayRowLabelArgs } from './types'
import { useMemo } from 'react'

/**
 * Helper function to get nested value from an object using dot notation
 * e.g. getNestedValue(obj, 'nested.fieldName')
 */
const getNestedValue = (obj: unknown, path: string): unknown => {
  return path.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

/**
 * Helper function to check if all field variables in a template are empty
 */
const hasEmptyFieldValues = (template: string, data: unknown): boolean => {
  const fieldMatches = template.match(/{{\s*([\w.]+)\s*}}/g)

  if (!fieldMatches) {
    return false
  }

  // Check if all field variables (excluding 'index') are empty
  return fieldMatches.every((match) => {
    const fieldPath = match.replace(/{{\s*|\s*}}/g, '')

    // Skip 'index' as it's always populated
    if (fieldPath === 'index') {
      return false
    }

    const value = getNestedValue(data, fieldPath)
    return !value || (typeof value === 'string' && value.trim() === '')
  })
}

/**
 * Helper function to process template strings with variable replacement
 */
const processTemplate = (template: string, data: unknown, rowNumber?: number): string => {
  let result = template.replace(/{{\s*index\s*}}/g, String(rowNumber || 0))

  result = result.replace(/{{\s*([\w.]+)\s*}}/g, (_, fieldPath) => {
    const value = getNestedValue(data, fieldPath)
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
    return ''
  })

  return result
}

const ArrayCustomLabel: React.FC<ArrayRowLabelArgs> = ({
  fieldToUse,
  template = false,
  fallbackLabel = 'Item {{index}}',
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, rowNumber } = useRowLabel<any>()

  const customLabel = useMemo(() => {
    let labelValue = ''
    let shouldUseFallback = false

    if (!template) {
      // Simple field mode
      const value = getNestedValue(data, fieldToUse)
      if (typeof value === 'string' || typeof value === 'number') {
        labelValue = String(value).trim()
      }
      shouldUseFallback = !labelValue
    } else {
      // Template mode - check if all field values are empty
      shouldUseFallback = hasEmptyFieldValues(fieldToUse, data)

      if (!shouldUseFallback) {
        labelValue = processTemplate(fieldToUse, data, rowNumber).trim()
      }
    }

    // Use fallback if needed
    if (shouldUseFallback) {
      labelValue = processTemplate(fallbackLabel, data, rowNumber)
    }

    return labelValue
  }, [data, fieldToUse, template, fallbackLabel, rowNumber])

  return <>{customLabel}</>
}

export default ArrayCustomLabel
