import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Highlights() {
  return (
    <section className="py-16 md:py-24 bg-pink-50">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Destaques do cardápio</h2>
            <p className="text-lg text-muted-foreground">Nossos doces mais queridos, feitos com amor e técnica</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image
                  src="/chocolate-truffle-with-ganache-filling.png"
                  alt="Trufas Gourmet"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="text-xl font-semibold">Trufas Gourmet</h3>
                <p className="text-muted-foreground">Recheios cremosos, cobertura de chocolate nobre</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image src="/large-flan-pudding-dessert.png" alt="Pudim Tradicional" fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="text-xl font-semibold">Pudim Tradicional</h3>
                <p className="text-muted-foreground">Textura lisa, calda brilhante, versão mini e inteira</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image src="/creamy-chocolate-popsicle.png" alt="Geladinhos Cremosos" fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="text-xl font-semibold">Geladinhos Cremosos</h3>
                <p className="text-muted-foreground">Sabores de infância, receita caprichada</p>
              </CardContent>
            </Card>
          </div>

          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
            <Link href="/cardapio">Ver cardápio completo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
