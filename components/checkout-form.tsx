"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { getCart, calculateDiscount } from "@/lib/cart"
import { generateWhatsAppMessage, sendWhatsAppOrder, type OrderData } from "@/lib/whatsapp"

interface CheckoutFormProps {
  onOrderSubmit?: () => void
}

export function CheckoutForm({ onOrderSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<Partial<OrderData>>({
    deliveryType: "pickup",
    paymentMethod: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = "WhatsApp é obrigatório"
    }

    if (!formData.deliveryType) {
      newErrors.deliveryType = "Selecione entrega ou retirada"
    }

    if (formData.deliveryType === "delivery") {
      if (!formData.address?.trim()) {
        newErrors.address = "Endereço é obrigatório para entrega"
      }
      if (!formData.neighborhood?.trim()) {
        newErrors.neighborhood = "Bairro é obrigatório para entrega"
      }
      if (!formData.city?.trim()) {
        newErrors.city = "Cidade é obrigatória para entrega"
      }
    }

    if (!formData.date?.trim()) {
      newErrors.date = "Data é obrigatória"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      const cart = getCart()

      // Check if cart has pudins that require 48h notice
      const hasPudins = cart.some((item) => item.productId.startsWith("pudim-") && item.productId !== "pudim-mini")

      const minDays = hasPudins ? 2 : 1
      const minDate = new Date(today.getTime() + minDays * 24 * 60 * 60 * 1000)

      if (selectedDate < minDate) {
        newErrors.date = `Data deve ser pelo menos ${minDays === 2 ? "48h" : "24h"} a partir de hoje`
      }
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Forma de pagamento é obrigatória"
    }

    if (!agreedToTerms) {
      newErrors.terms = "Você deve concordar com as políticas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const handleInputChange = (field: keyof OrderData, value: string) => {
    if (field === "phone") {
      value = formatPhoneNumber(value)
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const cart = getCart()
      const { subtotal, discount } = calculateDiscount(cart)
      const total = subtotal - discount

      const message = generateWhatsAppMessage(cart, formData as OrderData, discount, total)

      sendWhatsAppOrder(message)

      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado via WhatsApp. Responderemos em breve!",
      })

      onOrderSubmit?.()
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description:
          "Não foi possível abrir o WhatsApp. Tente novamente ou entre em contato pelo número (67) 99820-1822.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp *</Label>
              <Input
                id="phone"
                placeholder="(xx) xxxxx-xxxx"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail (opcional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Entrega ou retirada *</Label>
            <RadioGroup
              value={formData.deliveryType}
              onValueChange={(value) => handleInputChange("deliveryType", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Retirada</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Entrega</Label>
              </div>
            </RadioGroup>
            {errors.deliveryType && <p className="text-sm text-red-500">{errors.deliveryType}</p>}
          </div>

          {formData.deliveryType === "delivery" && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço completo *</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, complemento"
                  value={formData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro *</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood || ""}
                    onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    className={errors.neighborhood ? "border-red-500" : ""}
                  />
                  {errors.neighborhood && <p className="text-sm text-red-500">{errors.neighborhood}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data desejada *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ""}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeWindow">Janela de horário</Label>
              <Input
                id="timeWindow"
                placeholder="Ex.: 14h–16h"
                value={formData.timeWindow || ""}
                onChange={(e) => handleInputChange("timeWindow", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Forma de pagamento *</Label>
            <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
              <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              placeholder="Ex.: sem lactose, dedicar 'Feliz Aniversário, Ana!'"
              value={formData.observations || ""}
              onChange={(e) => handleInputChange("observations", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                Ao enviar, você concorda com nossa política de produção e prazos. Encomendas de pudim inteiro pedem 48h
                de antecedência.
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
              {isSubmitting ? "Enviando..." : "Enviar via WhatsApp"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/cardapio">Voltar ao cardápio</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
