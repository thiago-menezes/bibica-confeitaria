import { Card, CardContent } from "@/components/ui/card"
import { Phone, Instagram, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-pink-50">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Contato</h2>
            <p className="text-lg text-muted-foreground">Entre em contato conosco para fazer seu pedido</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Phone className="h-8 w-8 mx-auto text-pink-500" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Instagram className="h-8 w-8 mx-auto text-pink-500" />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <p className="text-sm text-muted-foreground">@bibica.gourmet</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Mail className="h-8 w-8 mx-auto text-pink-500" />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-sm text-muted-foreground">contato@bibicagourmet.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-3">
                <Clock className="h-8 w-8 mx-auto text-pink-500" />
                <div>
                  <h3 className="font-semibold">Atendimento</h3>
                  <p className="text-sm text-muted-foreground">seg–sáb, 9h–19h</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
