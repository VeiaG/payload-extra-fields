import { Footer } from "@/components/footer"
import { HomeLayout as FumaDocsLayout } from '@/components/layout/home';
import { baseOptions } from '@/lib/layout.shared';
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <FumaDocsLayout {...baseOptions()} >
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </FumaDocsLayout>
  )
}
