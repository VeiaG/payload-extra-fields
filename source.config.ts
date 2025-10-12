import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { rehypeCode } from "fumadocs-core/mdx-plugins"

export default defineConfig({
})

export const docs = defineDocs({
  dir: "content/docs",
})
