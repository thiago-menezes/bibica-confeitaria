import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-pink-50 to-white">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-balance leading-tight">
              <span className="bibica-pink">Bibica</span> – Cozinha Gourmet
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-pretty">
              Gourmet de verdade, feito um a um, com carinho de família.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
              Somos uma confeitaria familiar que produz trufas, pudins e geladinhos gourmet com ingredientes
              selecionados, receitas autorais e produção 100% artesanal. Perfeitos para presentes, eventos e aquele mimo
              do dia.
            </p>
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white focus-visible:focus-visible">
              <Link href="/cardapio">Ver cardápio</Link>
            </Button>
          </div>
          <div className="relative order-first lg:order-last">
            <Image
              src="/chocolate-truffle-with-ganache-filling.png"
              alt="Trufas gourmet artesanais com recheio cremoso"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto max-w-md mx-auto lg:max-w-none"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
