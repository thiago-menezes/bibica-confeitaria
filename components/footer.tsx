import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Image src="/bibica-logo.svg" alt="Bibica Cozinha Gourmet" width={100} height={32} className="h-40 w-auto" />
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/cardapio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cardápio
            </Link>
            <Link href="/#contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">© 2025 Bibica Cozinha Gourmet. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
