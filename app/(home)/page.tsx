import Link from "next/link"
import { Button } from "@/components/ui/shadcnButton"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Code2 } from "lucide-react"
import { PayloadLogo } from "@/components/icons"
import ComponentItem from "@/components/component-item"
import { fields, components, plugins } from "@/config/items"

export default function Home() {
  const renderSection = (
    title: string,
    description: string,
    items: typeof fields,
    viewAllHref: string,
    bgMuted = false
  ) => {
    const displayItems = items.slice(0, 4)
    const hasMore = items.length > 4
    const showComingSoon = items.length < 4

    return (
      <section className={`px-4 py-16 md:py-24 ${bgMuted ? 'bg-muted/50' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {displayItems.map((item) => (
              <ComponentItem key={item.name} component={item} />
            ))}
            
            {showComingSoon && (
              <Card className="border-dashed bg-muted/30 col-span-2">
                <CardHeader>
                  <CardTitle className="text-muted-foreground">More Coming Soon</CardTitle>
                  <CardDescription>
                    We&apos;re working on more {title.toLowerCase()}. Star the repo to stay updated!
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href={viewAllHref}>
                  View All {title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 text-center">
        <Badge variant="secondary" className="mb-4">
          PayloadCMS Extensions
        </Badge>
                   
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 max-w-4xl">
          Custom fields & components for{" "}
          <div className="inline-flex gap-2 items-center overflow-visible">
            <PayloadLogo className="size-16 inline-block" />
              Payload
          </div>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          A growing collection of customizable, accessible fields, utility components, and plugins built specifically for PayloadCMS.
          Ready to copy, paste, and customize for your project.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild size="lg">
            <Link href="/docs">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">
              Get Started
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why use this collection?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built with best practices, fully customizable, and ready to drop into your PayloadCMS projects.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Copy & Paste</CardTitle>
                <CardDescription>
                  No npm packages required. Copy the code directly into your project and customize as needed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fully Customizable</CardTitle>
                <CardDescription>
                  Every component is built to be customized. Change colors, styles, and behavior to match your needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <PayloadLogo className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>PayloadCMS Native</CardTitle>
                <CardDescription>
                  Built specifically for PayloadCMS with proper type definitions and admin UI integration.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Fields Section */}
      {renderSection(
        "Custom Fields",
        "Enhanced input fields for your PayloadCMS admin panel",
        fields,
        "/fields",
        false
      )}

      {/* Components Section */}
      {renderSection(
        "Utility Components",
        "Helper components to enhance your PayloadCMS development experience",
        components,
        "/components",
        true
      )}

      {/* Plugins Section */}
      {renderSection(
        "Plugins",
        "Powerful plugins to extend your PayloadCMS capabilities",
        plugins,
        "/plugins",
        false
      )}

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Browse our collection or dive into the documentation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/veiag/payload-extra-fields" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}