import { Index } from '@/registry/__index__'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock'
import { codeToHtml } from 'shiki'

// Map file extensions to language identifiers
const extToLang: Record<string, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  json: 'json',
  scss: 'scss',
  css: 'css',
  md: 'markdown',
}

export async function ManualInstall({ name }: { name: string }) {
  const item = Index[name]
  if (!item) return null

  if (item.files && item.files.length > 0) {
    const filesContent = await Promise.all(
      item.files.map(async (filePath) => {
        try {
          const fullPath = join(process.cwd(), filePath)
          const content = readFileSync(fullPath, 'utf-8')
          // Remove /registry/ from file path
          const newFilePath = filePath.replace('/registry/', '')
          // Get file extension
          const fileExtension = filePath.split('.').pop() || 'text'
          // Map file extension to language
          const language = extToLang[fileExtension] || fileExtension

          // Generate syntax-highlighted HTML
          const html = await codeToHtml(content, {
            lang: language,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
            defaultColor: false,
          })

          return { filePath: newFilePath, html, language }
        } catch {
          return {
            filePath,
            html: '<pre><code>// File not found</code></pre>',
            language: 'text',
          }
        }
      })
    )

    return (
      <>
        {filesContent.map(({ filePath, html }) => (
          <CodeBlock key={filePath} title={filePath}>
            <Pre dangerouslySetInnerHTML={{ __html: html }} />
          </CodeBlock>
        ))}
      </>
    )
  }

  return null
}