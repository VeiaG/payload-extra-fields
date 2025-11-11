import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/shadcnButton"
import { ArrowRight, Tag } from "lucide-react"

const components = [
  {
    name: "Array Row Label",
    description: "A utility component for PayloadCMS that provides customizable labels for array field items with template syntax and fallback support.",
    href: "/docs/components/array-row-label",
    icon: Tag,
    badge: "New",
  },
  
]

export default function ComponentsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground">
            Beautifully designed custom components that you can copy and paste into your PayloadCMS apps. Each component includes both the UI component and utility function for easy integration.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => {
            const Icon = component.icon
            return (
              <Card key={component.name} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    {component.badge && (
                      <Badge variant="secondary">{component.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{component.name}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild size="sm" className="w-full">
                    <Link href={component.href}>
                      View Field <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}

          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle className="text-muted-foreground">More Coming Soon</CardTitle>
              <CardDescription>
                We&apos;re working on adding more components. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
