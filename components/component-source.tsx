"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { Index } from "@/registry/__index__"

export function ComponentSource({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const item = Index[name]

  const code = item?.source || `Source code for ${name} not available.`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg border bg-muted/50">
      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 z-10"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
        <pre className="overflow-x-auto p-4 text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
