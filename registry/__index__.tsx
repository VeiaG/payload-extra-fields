import dynamic from "next/dynamic";

export const Index: Record<
    string,
    {
        name: string;
        component: React.ComponentType;
        /**
         * Source code of example component
         */
        source?: string;

        files?: string[];
    }
> = {
    "color-picker": {
        name: "color-picker",
        component: dynamic(
            () => import("@/components/examples/color-picker-demo")
        ),
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
        files: [
            "/registry/fields/color-picker/index.tsx",
            "/registry/fields/color-picker/field.ts",
            "/registry/fields/color-picker/types.ts",
            "/registry/fields/color-picker/style.scss",
        ],
    },
    "lucide-icon-picker": {
        name: "lucide-icon-picker",
        component: dynamic(
            () => import("@/components/examples/lucide-icon-picker-demo")
        ),
        source: `import { iconPicker } from '@/fields/lucide-icon-picker/field'

export const MyCollection = {
  slug: 'my-collection',
  fields: [
    iconPicker({
      name: 'icon',
      required: true,
      description: 'Choose an icon for this feature',
    }),
  ],
}
`,
        files: [
            "/registry/fields/lucide-icon-picker/index.tsx",
            "/registry/fields/lucide-icon-picker/field.ts",
            "/registry/fields/lucide-icon-picker/types.ts",
            "/registry/fields/lucide-icon-picker/style.scss",
            "/registry/fields/lucide-icon-picker/icons.ts",
        ],
    },
    "array-row-label": {
        name: "array-row-label",
        component: dynamic(
            () => import("@/components/examples/array-row-label-demo")
        ),
        source: `import { customRowLabel } from '@/components/array-row-label/utility'

export const MyCollection = {
  slug: 'my-collection',
  fields: [
    {
      name: 'articles',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'author',
          type: 'text',
        },
      ],
      admin: {
        ...customRowLabel({ fieldToUse: 'title' }),
      },
    },
  ],
}`,
        files: [
            "/registry/components/array-row-label/index.tsx",
            "/registry/components/array-row-label/utility.ts",
            "/registry/components/array-row-label/types.ts",
        ],
    },
    "slug":{
      name: "slug",
      component: ()=>null,//No preview
      files:[
        "/registry/fields/slug/index.tsx",
        "/registry/fields/slug/field.ts",
        "/registry/fields/slug/countVersions.ts",
        "/registry/fields/slug/generateSlug.ts",
        "/registry/fields/slug/slugify.ts",
        "/registry/fields/slug/style.scss",
      ]
    }
};
