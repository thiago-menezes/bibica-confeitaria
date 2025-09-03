import { Card, CardContent } from "@/components/ui/card"

export function Events() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Seu evento, ainda mais doce</h2>
            <p className="text-lg text-muted-foreground">
              Aniversários, mini weddings, corporativos e kits-presente. Montamos combos sob medida para você.
            </p>
          </div>

          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-8 text-center">
              <blockquote className="text-lg italic text-muted-foreground">
                "Doce perfeito: bonito, equilibrado e pontual. Virou tradição aqui em casa!"
              </blockquote>
              <cite className="text-sm font-medium mt-4 block">— Alexandre Vilagram</cite>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
