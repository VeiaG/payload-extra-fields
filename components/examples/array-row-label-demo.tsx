'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface ArrayItem {
  id: number
  title: string
  author: string
}

const ArrayCustomLabelPreview: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const [items, setItems] = useState<ArrayItem[]>([
    { id: 0, title: 'Introduction to React', author: 'John Doe' },
    { id: 1, title: 'Advanced TypeScript', author: 'Jane Smith' },
    { id: 2, title: 'Building with PayloadCMS', author: 'Sarah Wilson' },
  ])

  const updateItem = (id: number, field: keyof Omit<ArrayItem, 'id'>, value: string): void => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const getLabel = (item: ArrayItem, index: number): string => {
    // This mimics the actual component logic
    return item.title || `Article ${index}`
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border rounded-lg overflow-hidden bg-card">
        {/* Array Field Header */}
        <div className="bg-muted/50 border-b px-4 pt-3">
          <h3 className="font-semibold text-sm mt-0">Articles Array</h3>
        </div>

        {/* Array Items */}
        <div className="divide-y">
          {items.map((item, index) => (
            <div key={item.id} className="bg-card">
              {/* Collapsed Row with Custom Label */}
              <div 
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => setExpanded(!expanded)}
              >
                <button className="text-muted-foreground hover:text-foreground">
                  {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{getLabel(item, index)}</div>
                </div>
              </div>

              {/* Expanded Content */}
              {expanded && (
                <div className="px-4 pb-4 pt-2 bg-muted/30 border-t">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter article title..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">author</label>
                      <input
                        type="text"
                        value={item.author}
                        onChange={(e) => updateItem(item.id, 'author', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Enter author name..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ArrayCustomLabelPreview