import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { plugins } from "@/config/items"
import ComponentItem from "@/components/component-item"

export default function ComponentsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Plugins</h1>
          <p className="text-lg text-muted-foreground">
            Beautifully designed custom plugins.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plugins.map((component) => {
            return (
              <ComponentItem key={component.name} component={component} />
            )
          })}

          <Card className="border-dashed bg-muted/30">
            <CardHeader>
              <CardTitle className="text-muted-foreground">More Coming Soon</CardTitle>
              <CardDescription>
                We&apos;re working on adding more plugins. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
