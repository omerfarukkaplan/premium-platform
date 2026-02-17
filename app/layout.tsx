import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FollowOps | Türkiye'nin Premium Uzman Platformu",
  description:
    "Online ders, spor, freelancer ve danışmanlık hizmetleri sunan premium uzmanları keşfet.",
  keywords: [
    "uzman",
    "danışman",
    "online ders",
    "freelancer",
    "premium hizmet",
  ],
  metadataBase: new URL("https://followops.app"),
  openGraph: {
    title: "FollowOps Premium Uzman Platformu",
    description:
      "En iyi uzmanları keşfet, hizmet satın al veya kendi hizmetini sat.",
    url: "https://followops.app",
    siteName: "FollowOps",
    locale: "tr_TR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} bg-neutral-50 text-neutral-900 antialiased`}
      >
        {/* NAVBAR */}
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              FollowOps
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/kategoriler" className="hover:text-black/70">
                Kategoriler
              </Link>
              <Link href="/blog" className="hover:text-black/70">
                Blog
              </Link>
              <Link href="/dashboard" className="hover:text-black/70">
                Panel
              </Link>
              <Link
                href="/satici"
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition"
              >
                Hizmet Sat
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="min-h-screen">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white mt-20">
          <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8 text-sm text-neutral-600">
            <div>
              <h3 className="font-semibold text-black mb-3">
                FollowOps
              </h3>
              <p>
                Türkiye'nin premium uzman platformu. Güvenli ödeme, kaliteli
                hizmet.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-black mb-2">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/kategoriler">Kategoriler</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-black mb-2">Satıcı</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/satici">Satıcı Paneli</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-black mb-2">Yasal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/gizlilik">Gizlilik</Link>
                </li>
                <li>
                  <Link href="/kullanim">Kullanım Şartları</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center py-4 text-xs text-neutral-400 border-t">
            © {new Date().getFullYear()} FollowOps. Tüm hakları saklıdır.
          </div>
        </footer>
      </body>
    </html>
  )
}
