import { Tag, CircleDot, Palette, Search, PanelRight } from "lucide-react";

export type ComponentItemType = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export const components: ComponentItemType[] = [
  {
    name: "Array Row Label",
    description: "A utility component for PayloadCMS that provides customizable labels for array field items with template syntax and fallback support.",
    href: "/docs/components/array-row-label",
    icon: Tag,
    badge: "New",
  },
  
]

export const fields: ComponentItemType[] =  [
  {
    name: "Lucide Icon Picker",
    description: "A customizable icon picker field for PayloadCMS with Lucide icons, fuzzy search, and virtualized rendering.",
    href: "/docs/fields/lucide-icon-picker",
    icon: CircleDot,
  },
  {
    name: "Color Picker",
    description: "A customizable color picker field with presets, debounce, and hex validation for PayloadCMS.",
    href: "/docs/fields/color-picker",
    icon: Palette,
  },
  {
    name: "Slug Field",
    description:" A copy of Payload's native slug field that lives in your codebase, allowing you to customize the slugify function and UI behavior.",
    href: "/docs/fields/slug",
    icon: Tag,
    badge: "New",
  }
  
]

export const plugins: ComponentItemType[] = [
  {
    name: "Algolia Search Plugin",
    description:"A powerful plugin to sync your Payload CMS collections with Algolia for fast and extensive search capabilities.",
    href: "/docs/plugins/algolia-search",
    icon: Search,
  },
  {
    name:'Sidebar Plugin',
    description: "A powerful, customizable navigation sidebar plugin for Payload CMS with sortable groups, pinning, custom links, and multi-color badges.",
    href: "/docs/plugins/payload-sidebar",
    icon: PanelRight,
    badge:"Community Plugin"
  }
]