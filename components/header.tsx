  "use client"

  import Link from "next/link"
  import Image from "next/image"
  import { useState } from "react"
  import { Menu, X } from "lucide-react"
  import { Button } from "@/components/ui/button"

  export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
      <header className="z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-40 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/bibica-logo.svg"
              alt="Bibica Cozinha Gourmet"
              width={200}
              height={80}
              className="h-20 sm:h-40 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible"
            >
              Home
            </Link>
            <Link
              href="/cardapio"
              className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible"
            >
              Cardápio
            </Link>
            <Link
              href="/#contato"
              className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible"
            >
              Contato
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden focus-visible:focus-visible"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur border-b md:hidden">
              <nav className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/cardapio"
                  className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cardápio
                </Link>
                <Link
                  href="/#contato"
                  className="text-sm font-medium hover:text-pink-500 transition-colors focus-visible:focus-visible py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    )
  }
