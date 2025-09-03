import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Bibica – Cozinha Gourmet | Trufas, Pudins e Geladinhos Artesanais",
  description:
    "Confeitaria familiar com doces gourmet feitos à mão: trufas, pudins e geladinhos com ingredientes selecionados. Encomendas para presentes e eventos.",
  generator: "v0.app",
  openGraph: {
    title: "Bibica – Cozinha Gourmet",
    description: "Doces artesanais com qualidade ímpar. Feitos um a um, com carinho de família.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}>
        <div className="w-full max-w-screen-2xl mx-auto">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
