# Contributing to PayloadCMS Extra Fields

Thank you for your interest in contributing to PayloadCMS Extra Fields! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install` or `pnpm install`
4. Create a new branch for your contribution: `git checkout -b feature/your-field-name`

## Project Structure

```
payload-extra-fields/
├── registry/
│   └── fields/
│       └── your-field/
│           ├── index.tsx       # Field component
│           ├── field.ts        # Utility function
│           ├── types.ts        # TypeScript types
│           └── style.scss      # Styles (if needed)
├── content/
│   └── docs/
│       └── fields/
│           └── your-field.mdx  # Documentation
├── components/
│   └── examples/
│       └── your-field-demo.tsx # Demo component
└── registry.json               # Registry configuration
```

## Adding a New Field

To contribute a new custom field to the registry:

### 1. Create the Field Files

Create a new directory under `registry/fields/` with your field name:

```typescript
// registry/fields/your-field/types.ts
import { TextField } from 'payload'

export type YourFieldArgs = {
  name?: string
  required?: boolean
  // Add your custom options here
  overrides?: (field: TextField) => TextField
}

export type YourFieldProps = Pick<YourFieldArgs, 'customOption1' | 'customOption2'>
```

```typescript
// registry/fields/your-field/field.ts
import { TextField } from 'payload'
import { YourFieldArgs } from './types'

export const yourField = (options?: YourFieldArgs): TextField => {
  const baseField: TextField = {
    name: options?.name || 'yourFieldName',
    type: 'text',
    required: options?.required || false,
    admin: {
      components: {
        Field: {
          path: '@/fields/your-field',
          clientProps: {
            // Pass your custom options here
          },
        },
      },
    },
  }

  if (typeof options?.overrides === 'function') {
    return options.overrides(baseField)
  }

  return baseField
}
```

```tsx
// registry/fields/your-field/index.tsx
'use client'
import { useField, FieldLabel } from '@payloadcms/ui'
import { YourFieldProps } from './types'
import './style.scss'

export default function YourField(props: YourFieldProps) {
  const { value, setValue } = useField<string>({ path: props.path })

  return (
    <div className="your-field-wrapper">
      <FieldLabel label={props.label} required={props.required} />
      {/* Your field implementation */}
    </div>
  )
}
```

### 2. Update registry.json

Add your field to the `registry.json` file:

```json
{
  "items": [
    {
      "name": "your-field",
      "type": "registry:item",
      "title": "Your Field",
      "description": "A brief description of your field.",
      "files": [
        {
          "path": "registry/fields/your-field/field.ts",
          "type": "registry:file",
          "target": "~/src/fields/your-field/field.ts"
        },
        {
          "path": "registry/fields/your-field/index.tsx",
          "type": "registry:file",
          "target": "~/src/fields/your-field/index.tsx"
        },
        {
          "path": "registry/fields/your-field/types.ts",
          "type": "registry:file",
          "target": "~/src/fields/your-field/types.ts"
        }
      ]
    }
  ]
}
```

### 3. Create Documentation

Create a documentation file at `content/docs/fields/your-field.mdx`:

```mdx
---
title: Your Field
description: A brief description of your field.
---

# Your Field

A detailed description of what your field does and why it's useful.

## Installation

<Tabs defaultValue="auto">
  <TabsList className="grid w-full max-w-md grid-cols-2">
    <TabsTrigger value="auto">Auto</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="auto">

```npm
npx shadcn@latest add https://payload.veiag.dev/r/your-field
```

  </TabsContent>
  <TabsContent value="manual">

<ManualInstall name="your-field" />

  </TabsContent>
</Tabs>

## Usage

### Basic usage

```typescript
import { yourField } from '@/fields/your-field/field'

export const MyCollection = {
  slug: 'my-collection',
  fields: [
    yourField({
      name: 'fieldName',
      required: true,
    }),
  ],
}
```

## API Reference

Document your field's options and props here.

## Features

- List key features of your field
- Explain what makes it useful
```

### 4. Add to the Registry Index

Update `registry/__index__.tsx`:

```typescript
export const Index: Record<string, any> = {
  "your-field": {
    name: "your-field",
    component: dynamic(() => import("@/components/examples/your-field-demo")),
    source: `// Example usage code here`,
    files: [
      "/registry/fields/your-field/index.tsx",
      "/registry/fields/your-field/field.ts",
      "/registry/fields/your-field/types.ts",
    ]
  },
}
```

### 5. Update the Fields List

Add your field to `app/(home)/fields/page.tsx`:

```typescript
const components = [
  {
    name: "Your Field",
    description: "Brief description",
    href: "/docs/fields/your-field",
    icon: YourIcon,
    badge: "New",
  },
]
```

## Code Style Guidelines

- Use TypeScript for all code
- Follow the existing code structure and naming conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure your code is properly formatted

## Testing

Before submitting your contribution:

1. Test the field in a PayloadCMS project
2. Verify the installation process works
3. Check that documentation is clear and accurate
4. Ensure all files are properly formatted

## Submitting a Pull Request

1. Commit your changes with clear, descriptive commit messages
2. Push your branch to your fork
3. Open a pull request against the `main` branch
4. Provide a clear description of your changes
5. Link any related issues

### PR Description Template

```markdown
## Description
Brief description of the field and what it does

## Type of Change
- [ ] New field
- [ ] Bug fix
- [ ] Documentation update
- [ ] Other (please describe)

## Checklist
- [ ] Field implementation is complete
- [ ] Documentation is added/updated
- [ ] Registry files are updated
- [ ] Examples are provided
- [ ] Code follows project conventions
- [ ] Field has been tested in a PayloadCMS project
```

## Questions?

If you have questions or need help, please open an issue on GitHub.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
