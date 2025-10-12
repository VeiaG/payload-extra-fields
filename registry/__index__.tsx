import dynamic from "next/dynamic"

export const Index: Record<
  string,
  {
    name: string
    component: React.ComponentType
    /**
     * Source code of example component
     */
    source?: string

    files?: string[]
  }
> = {
  "color-picker": {
    name: "color-picker",
    component: dynamic(() => import("@/components/examples/color-picker-demo")),
    source: `import { colorField } from '@/fields/color-picker/field'

export const MyCollection = {
  slug: 'my-collection',
  fields: [
    colorField({
      name: 'themeColor',
      colorPresets: [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#FFA07A',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE',
        '#85C1E2',
      ],
      debounceDelay: 500,
    }),
  ],
}`,
    files: ["/registry/fields/color-picker/index.tsx",
      "/registry/fields/color-picker/field.ts",
      "/registry/fields/color-picker/types.ts",
      "/registry/fields/color-picker/style.scss"
    ]
  },
}
