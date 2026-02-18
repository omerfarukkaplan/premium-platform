import "./globals.css";
import Script from "next/script";
import Link from "next/link";

export const metadata = {
  title: "FollowOps",
  description: "Türkiye'nin Premium Uzman Platformu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {/* Paddle Script */}
        <Script
          src="https://cdn.paddle.com/paddle/v2/paddle.js"
          strategy="afterInteractive"
        />

        <header className="header">
          <div className="container nav">
            <Link href="/" className="logo">FollowOps</Link>

            <nav>
              <Link href="/kategoriler">Kategoriler</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/panel">Panel</Link>
              <Link href="/satici" className="btn-dark">
                Hizmet Sat
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="container footer-grid">
            <div>
              <h4>FollowOps</h4>
              <p>Türkiye'nin premium uzman platformu.</p>
            </div>

            <div>
              <h4>Platform</h4>
              <Link href="/kategoriler">Kategoriler</Link>
              <Link href="/blog">Blog</Link>
            </div>

            <div>
              <h4>Satıcı</h4>
              <Link href="/satici">Satıcı Paneli</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>

            <div>
              <h4>Yasal</h4>
              <p>Gizlilik</p>
              <p>Kullanım Şartları</p>
            </div>
          </div>

          <p className="copyright">
            © 2026 FollowOps
          </p>
        </footer>
      </body>
    </html>
  );
}
