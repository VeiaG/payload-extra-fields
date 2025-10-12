import { Index } from '@/registry/__index__'
import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock'
import { codeToHtml } from 'shiki'

export async function ComponentSource({ name }: { name: string }) {
  const item = Index[name]
  const code = item?.source || '// Source code not available'

  // Generate syntax-highlighted HTML
  const html = await codeToHtml(code, {
    lang: 'typescript',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  })

  return (
    <CodeBlock className='mt-0'>
      <Pre dangerouslySetInnerHTML={{ __html: html }} />
    </CodeBlock>
  )
}
