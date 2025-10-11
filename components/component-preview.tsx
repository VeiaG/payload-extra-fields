"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Index } from "@/registry/__index__"
import { ComponentSource } from "./component-source"

export function ComponentPreview({
  name,
  align = "center",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
}) {
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <Tabs defaultValue="preview" className="relative mt-6 w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="preview"
          className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="relative rounded-md border">
        <div
          className={`flex min-h-[350px] w-full justify-${align} p-10`}
          {...props}
        >
          <Component />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <ComponentSource name={name} />
      </TabsContent>
    </Tabs>
  )
}
