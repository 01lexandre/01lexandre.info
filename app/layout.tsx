import type { Metadata } from "next";
import { Open_Sans, Cookie } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const cookie = Cookie({
  weight: "400",
  variable: "--font-cookie",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlos Alexandre • Developer from Brazil",
  description: "Head of Products with over a decade of experience leading products at the intersection of technology and business. Multidisciplinary professional combining strategic vision with technical execution.",
  keywords: ["Carlos Alexandre", "Developer", "Brazil", "Head of Products", "Full Stack Developer", "Product Manager", "TypeScript", "React", "Next.js", "Node.js"],
  authors: [{ name: "Carlos Alexandre" }],
  creator: "Carlos Alexandre",
  publisher: "Carlos Alexandre",
  metadataBase: new URL("https://01lexandre.info"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Carlos Alexandre • Developer from Brazil",
    description: "Head of Products with over a decade of experience leading products at the intersection of technology and business. Multidisciplinary professional combining strategic vision with technical execution.",
    url: "https://01lexandre.info",
    siteName: "Carlos Alexandre",
    images: [
      {
        url: "https://01lexandre.info/foto-01lexandre.jpg",
        width: 112,
        height: 112,
        alt: "Carlos Alexandre - Developer from Brazil",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Carlos Alexandre • Developer from Brazil",
    description: "Head of Products with over a decade of experience leading products at the intersection of technology and business.",
    images: ["https://01lexandre.info/foto-01lexandre.jpg"],
    creator: "@01lexandre",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes here if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N9V9PTJJ');`,
        }}
      />
      <body
        className={`${openSans.variable} ${cookie.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9V9PTJJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
