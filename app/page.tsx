import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Highlights } from "@/components/highlights"
import { Events } from "@/components/events"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Highlights />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
