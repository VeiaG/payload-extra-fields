import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <div className="flex items-center gap-2">
              <span className="font-bold">PayloadCMS</span>
              <span className="text-muted-foreground">Components</span>
            </div>
          ),
        }}
        links={[
          {
            text: "Documentation",
            url: "/docs",
            active: "nested-url",
          },
        ]}
        githubUrl="https://github.com/yourusername/payload-extra-fields"
      >
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
