import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 ">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for{" "}
            <a
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              PayloadCMS
            </a>
            . Using{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </a>{" "}
            CLI. 
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/fields"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Fields
          </Link>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Docs
          </Link>
        </div>
      </div>
    </footer>
  )
}
