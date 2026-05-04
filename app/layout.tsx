import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dasturlash departamenti — Veb Sayt, Bot, Mobil Ilova | Toshkent",
    template: "%s | Dasturlash departamenti",
  },
  description:
    "Toshkentdagi professional dasturlash jamoasi. Veb-sayt, mobil ilova, telegram bot va UI/UX dizayn xizmatlarini taqdim etamiz. 15+ muvaffaqiyatli loyiha. Bepul maslahat!",
  keywords: [
    "veb sayt yaratish Toshkent",
    "sayt yasash Toshkent",
    "dasturlash xizmatlari Uzbekiston",
    "web sayt narxi Toshkent",
    "telegram bot yaratish Toshkent",
    "mobil ilova dasturlash Uzbekiston",
    "UI UX dizayn Toshkent",
    "landing page yaratish",
    "arzon sayt yaratish Toshkent",
    "tez sayt yaratish Uzbekiston",
    "professional dasturchi Toshkent",
    "Next.js React dasturlash Toshkent",
    "web development Tashkent",
    "mobile app development Uzbekistan",
    "bot development Tashkent",
    "dasturlash departamenti Toshkent",
    "sayt tayyorlash Uzbekiston",
    "ilova yaratish Toshkent",
  ],
  authors: [{ name: "TechTeam", url: "https://techteam.uz" }],
  creator: "TechTeam",
  publisher: "TechTeam",
  metadataBase: new URL("https://techteam.uz"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TechTeam — Professional Dasturlash Jamoasi | Toshkent",
    description: "Veb-sayt, mobil ilova, bot va dizayn. Toshkentdagi eng yaxshi dasturlash jamoasi.",
    url: "https://techteam.uz",
    siteName: "TechTeam",
    locale: "uz_UZ",
    type: "website",
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
    google: "vbvb5gwgwjG-wS4GdK3578-pF678zjaXEM3g6WMqkt0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8D7S847Y3P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8D7S847Y3P');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
