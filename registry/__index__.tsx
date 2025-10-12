import dynamic from "next/dynamic"

export const Index: Record<
  string,
  {
    name: string
    component: React.ComponentType
    source?: string
  }
> = {
  "color-picker-demo": {
    name: "color-picker-demo",
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
}`
  },
}
