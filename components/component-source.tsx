"use client"
import { Index } from "@/registry/__index__"
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

export function ComponentSource({ name }: { name: string }) {
  const item = Index[name]

  const code = item?.source || `Source code for ${name} not available.`

  return (
   <DynamicCodeBlock lang="ts" code={code} />
  )
}
