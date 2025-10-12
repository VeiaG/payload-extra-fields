import Link from "next/link"
import { Button } from "@/components/ui/shadcnButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Download, Code2 } from "lucide-react"
import { PayloadLogo } from "@/components/icons"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 text-center">
        <Badge variant="secondary" className="mb-4">
          PayloadCMS Custom Fields
        </Badge>
                   

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 max-w-4xl">
          Custom fields for{" "}
          <div className="inline-flex gap-2 items-center overflow-visible">
            <PayloadLogo className="size-16 inline-block" />
              Payload
          </div>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          A collection of customizable, accessible custom fields built specifically for PayloadCMS.
          Each field includes both the UI component and utility function to easily integrate into your schemas.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild size="lg">
            <Link href="/fields">
              Browse Fields <ArrowRight className="ml-2 h-4 w-4" />
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
          <h2 className="text-3xl font-bold text-center mb-4">Why use these fields?</h2>
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
                  Every field is built to be customized. Change colors, styles, and behavior to match your needs.
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

      {/* Fields Preview Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Fields</h2>
            <p className="text-muted-foreground">
              More fields coming soon!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Color Picker</CardTitle>
                  <Badge>New</Badge>
                </div>
                <CardDescription>
                  A customizable color picker field with presets, debounce, and hex validation for PayloadCMS.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button asChild size="sm">
                    <Link href="/docs/fields/color-picker">
                      View Docs
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://github.com/yourusername/payload-extra-fields" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Install
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed bg-muted/30">
              <CardHeader>
                <CardTitle className="text-muted-foreground">More Coming Soon</CardTitle>
                <CardDescription>
                  We&apos;re working on more fields. Star the repo to stay updated!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Browse our fields or dive into the documentation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/fields">
                Browse Fields
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
