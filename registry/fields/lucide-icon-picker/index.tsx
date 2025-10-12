'use client'
import {
  AnimateHeight,
  Button,
  ChevronIcon,
  Drawer,
  FieldDescription,
  FieldError,
  FieldLabel,
  TextInput,
  useField,
  useModal,
  useTranslation,
} from '@payloadcms/ui'
import { DefaultCellComponentProps, TextFieldClient, TextFieldClientProps } from 'payload'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './style.scss'
import { IconData, IconPickerProps } from './types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { iconsData } from './icons'
import { useVirtualizer } from '@tanstack/react-virtual'
import Fuse from 'fuse.js'
import { useDebounceValue } from 'usehooks-ts'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = React.memo(({ content, children }) => {
  return (
    <div className="icon-picker__tooltip-wrapper">
      {children}
      <div className="icon-picker__tooltip">{content}</div>
    </div>
  )
})
Tooltip.displayName = 'Tooltip'

// Loading Skeleton Component
const IconsGridSkeleton: React.FC = () => {
  return (
    <div className="icon-picker__skeleton">
      <div className="icon-picker__skeleton-category" />
      <div className="icon-picker__skeleton-grid">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="icon-picker__skeleton-item" />
        ))}
      </div>
    </div>
  )
}

// Icon Renderer Component
interface IconRendererProps {
  name: string
  size?: number
}

const IconRenderer: React.FC<IconRendererProps> = React.memo(({ name, size = 20 }) => {
  return <DynamicIcon name={name as IconName} size={size} />
})
IconRenderer.displayName = 'IconRenderer'

// Icon Button Component
interface IconButtonProps {
  icon: IconData
  isSelected: boolean
  onSelect: (iconName: string) => void
  disabled?: boolean
}

const IconButton: React.FC<IconButtonProps> = React.memo(
  ({ icon, isSelected, onSelect, disabled }) => {
    return (
      <Tooltip content={icon.name}>
        <button
          type="button"
          className={
            isSelected
              ? 'icon-picker__icon-button icon-picker__icon-button--selected'
              : 'icon-picker__icon-button'
          }
          onClick={() => onSelect(icon.name)}
          disabled={disabled}
          aria-label={`Select ${icon.name} icon`}
        >
          <IconRenderer name={icon.name} size={24} />
        </button>
      </Tooltip>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.icon.name === nextProps.icon.name &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.disabled === nextProps.disabled
    )
  },
)
IconButton.displayName = 'IconButton'

const LucideIconPicker: React.FC<TextFieldClientProps & IconPickerProps> = ({
  path,
  field,
  showTextInput = true,
  searchable = true,
  categorized = true,
  searchPlaceholder = 'Search icons...',
  triggerPlaceholder = 'Select Icon',
  readOnly,
}) => {
  const { setValue, value, disabled, showError } = useField<string>({ path: path || field.name })
  const actualReadOnly = readOnly || field.admin?.readOnly || false
  const { openModal, closeModal } = useModal()

  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch] = useDebounceValue(searchInput, 200)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCategories, setShowCategories] = useState(false)

  const drawerSlug = `icon-${field.name}-drawer`

  // Fuse.js instance for fuzzy search
  const fuseInstance = useMemo(() => {
    return new Fuse(iconsData, {
      keys: ['name', 'tags', 'categories'],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    })
  }, [])

  // Filtered icons based on search
  const filteredIcons = useMemo(() => {
    if (debouncedSearch.trim() === '') {
      return iconsData
    }

    const results = fuseInstance.search(debouncedSearch.toLowerCase().trim())
    return results.map((result) => result.item)
  }, [debouncedSearch, fuseInstance])

  // Categorized icons
  const categorizedIcons = useMemo(() => {
    if (!categorized || debouncedSearch.trim() !== '') {
      return [{ name: 'All Icons', icons: filteredIcons }]
    }

    const categories = new Map<string, IconData[]>()

    filteredIcons.forEach((icon) => {
      if (icon.categories && icon.categories.length > 0) {
        icon.categories.forEach((category) => {
          if (!categories.has(category)) {
            categories.set(category, [])
          }
          categories.get(category)!.push(icon)
        })
      } else {
        const category = 'Other'
        if (!categories.has(category)) {
          categories.set(category, [])
        }
        categories.get(category)!.push(icon)
      }
    })

    return Array.from(categories.entries())
      .map(([name, icons]) => ({ name, icons }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredIcons, categorized, debouncedSearch])

  const parentRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Calculate container width and icons per row
  useEffect(() => {
    if (!parentRef.current) return

    const updateWidth = () => {
      if (parentRef.current) {
        setContainerWidth(parentRef.current.offsetWidth)
      }
    }

    updateWidth()
    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(parentRef.current)

    return () => resizeObserver.disconnect()
  }, [isDrawerOpen])

  // Calculate icons per row based on container width
  const iconsPerRow = useMemo(() => {
    if (containerWidth === 0) return 8
    // Icon: 70-85px, gap: 10px
    const iconWidth = 85
    const gap = 10
    const calculated = Math.floor((containerWidth + gap) / (iconWidth + gap))
    return Math.max(4, calculated)
  }, [containerWidth])

  // Flatten icons into rows with category headers
  const gridRows = useMemo(() => {
    const rows: Array<
      | { type: 'category'; name: string; index: number }
      | { type: 'iconRow'; icons: IconData[]; index: number }
    > = []
    let rowIndex = 0

    categorizedIcons.forEach((category) => {
      // Add category header
      rows.push({ type: 'category', name: category.name, index: rowIndex++ })

      // Split icons into rows
      for (let i = 0; i < category.icons.length; i += iconsPerRow) {
        const rowIcons = category.icons.slice(i, i + iconsPerRow)
        rows.push({ type: 'iconRow', icons: rowIcons, index: rowIndex++ })
      }
    })

    return rows
  }, [categorizedIcons, iconsPerRow])

  // Row virtualizer
  const rowVirtualizer = useVirtualizer({
    count: gridRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const row = gridRows[index]
      return row?.type === 'category' ? 50 : 100
    },
    overscan: 5,
  })

  const handleIconSelect = useCallback(
    (iconName: string) => {
      if (value === iconName) {
        setValue(null)
        closeModal(drawerSlug)
        setSearchInput('')
        return
      }
      setValue(iconName)
      closeModal(drawerSlug)
      setSearchInput('')
    },
    [setValue, closeModal, drawerSlug, value],
  )

  const handleTextInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const iconName = event?.target.value
      setValue(iconName)
    },
    [setValue],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value)
      rowVirtualizer.scrollToOffset(0)
    },
    [rowVirtualizer],
  )

  const scrollToCategory = useCallback(
    (categoryName: string) => {
      const categoryIndex = gridRows.findIndex(
        (row) => row.type === 'category' && row.name === categoryName,
      )
      if (categoryIndex !== -1) {
        rowVirtualizer.scrollToIndex(categoryIndex, { align: 'start' })
      }
    },
    [gridRows, rowVirtualizer],
  )

  // Handle drawer open/close
  useEffect(() => {
    if (isDrawerOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
        requestAnimationFrame(() => {
          rowVirtualizer.measure()
        })
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [isDrawerOpen, rowVirtualizer])

  const isDisabled = actualReadOnly || disabled

  const virtualRows = rowVirtualizer.getVirtualItems()

  // Virtualized content
  const virtualContent = (
    <>
      {filteredIcons.length === 0 ? (
        <div className="icon-picker__no-results">No icons found</div>
      ) : (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = gridRows[virtualRow.index]
            if (!row) return null

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.type === 'category' ? (
                  <div className="icon-picker__category-header">
                    <h3 className="icon-picker__category-title">{row.name}</h3>
                    <div className="icon-picker__category-divider" />
                  </div>
                ) : (
                  <div className="icon-picker__icon-row">
                    {row.icons.map((icon) => (
                      <div key={icon.name} className="icon-picker__icon-cell">
                        <IconButton
                          icon={icon}
                          isSelected={value === icon.name}
                          onSelect={handleIconSelect}
                          disabled={isDisabled}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )

  return (
    <div className="icon-picker">
      <FieldLabel
        label={field.label}
        localized={field.localized}
        path={path}
        required={field.required}
      />
      <div className="icon-picker__main">
        <div className="icon-picker__controls">
          <Button
            onClick={() => {
              if (!actualReadOnly && !disabled) {
                setIsDrawerOpen(true)
                openModal(drawerSlug)
              }
            }}
            disabled={actualReadOnly || disabled}
            margin={false}
            buttonStyle={'secondary'}
            className={showError ? 'icon-picker__error-btn' : undefined}
          >
            {value ? (
              <span className="icon-picker__selected-icon">
                <IconRenderer name={value} size={18} />
                <span>{value}</span>
              </span>
            ) : (
              triggerPlaceholder
            )}
          </Button>
          {value && !actualReadOnly && !disabled && (
            <Button
              onClick={() => setValue(null)}
              buttonStyle="icon-label"
              disabled={actualReadOnly || disabled}
              aria-label="Clear selected icon"
              margin={false}
              iconStyle="with-border"
              icon={['x']}
            ></Button>
          )}
          {showTextInput && (
            <TextInput
              value={value || ''}
              onChange={handleTextInputChange}
              placeholder="e.g., home"
              readOnly={actualReadOnly || disabled}
              path={path}
              required={field.required}
            />
          )}
        </div>
        <FieldError showError={showError} path={path} />
      </div>
      <FieldDescription description={field.admin?.description} path={path} />

      <Drawer slug={drawerSlug} title="Select Icon" className="icon-picker__drawer">
        <div className="icon-picker__drawer-header">
          {searchable && (
            <TextInput
              placeholder={searchPlaceholder}
              onChange={handleSearchChange}
              className="icon-picker__search-input"
              value={searchInput}
              path={`${path}-search`}
            />
          )}
          {categorized && debouncedSearch.trim() === '' && (
            <>
              <Button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                icon={<ChevronIcon direction={showCategories ? 'up' : 'down'} />}
                margin={false}
              >
                <span>Browse by category</span>
              </Button>
              <AnimateHeight height={showCategories ? 'auto' : 0}>
                <div className="icon-picker__categories">
                  {categorizedIcons.map((category) => (
                    <Button
                      key={category.name}
                      type="button"
                      margin={false}
                      size="xsmall"
                      buttonStyle="pill"
                      onClick={() => scrollToCategory(category.name)}
                    >
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </Button>
                  ))}
                </div>
              </AnimateHeight>
            </>
          )}
        </div>
        <div ref={parentRef} className="icon-picker__drawer-content">
          {isLoading ? <IconsGridSkeleton /> : virtualContent}
        </div>
      </Drawer>
    </div>
  )
}

export const IconCell: React.FC<DefaultCellComponentProps<TextFieldClient>> = (props) => {
  const { cellData, field } = props
  const { i18n } = useTranslation()

  return (
    <div className="icon-cell">
      {cellData && (
        <div className="icon-cell__preview">
          <IconRenderer name={cellData} size={16} />
        </div>
      )}
      <span>
        {cellData
          ? cellData
          : i18n.t('general:noLabel', {
              label: field.name,
            })}
      </span>
    </div>
  )
}

export default LucideIconPicker
