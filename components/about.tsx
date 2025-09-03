import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Sobre a Bibica</h2>
            <p className="text-xl text-muted-foreground">O sabor que nasce em casa e chega à sua mesa</p>
          </div>

          <div className="prose prose-lg mx-auto text-center">
            <p className="text-lg leading-relaxed">
              A Bibica é uma cozinha gourmet de alma familiar. Cada doce é feito um por um, com técnica, paciência e
              respeito às tradições que nos formaram. Prezamos por qualidade, frescor e acabamento impecável — para
              encantar no primeiro olhar e no último pedacinho.
            </p>
            <p className="text-xl font-medium bibica-pink mt-8">Feitos à mão. Pensados para encantar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Produção artesanal</h3>
                <p className="text-sm text-muted-foreground">Em pequenos lotes, com técnica e cuidado</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Ingredientes selecionados</h3>
                <p className="text-sm text-muted-foreground">Chocolate nobre, leite fresco, frutas de verdade</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Acabamento premium</h3>
                <p className="text-sm text-muted-foreground">Embalagens caprichadas e apresentação impecável</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Atendimento personalizado</h3>
                <p className="text-sm text-muted-foreground">Próximo e dedicado para eventos especiais</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Desconto progressivo</h3>
                <p className="text-sm text-muted-foreground">Para encomendas maiores, economia garantida</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-semibold">Entrega e retirada</h3>
                <p className="text-sm text-muted-foreground">Local e agendada conforme sua conveniência</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
