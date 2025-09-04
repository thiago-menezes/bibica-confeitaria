"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageWithFallback } from "./image-with-fallback"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/sheets"
import { addToCart, formatCurrency } from "@/lib/cart"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>("")
  const { toast } = useToast()

  const handleQuantityChange = (value: string) => {
    const num = Number.parseInt(value)
    if (!isNaN(num) && num > 0) {
      setQuantity(num)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    if (product.variants && !selectedVariant) {
      toast({
        title: "Selecione uma variação",
        description: "Por favor, escolha uma variação do produto.",
        variant: "destructive",
      })
      return
    }

    const variant = product.variants?.find((v) => v.id === selectedVariant)

    addToCart({
      productId: product.id,
      variantId: selectedVariant || undefined,
      unitPrice: product.price,
      name: product.name,
      variant: variant?.label,
      qty: quantity,
    })

    toast({
      title: "Adicionado ao carrinho!",
      description: `${quantity}x ${product.name}${variant ? ` ${variant.label}` : ""} adicionado ao carrinho.`,
    })

    // Reset form
    setQuantity(1)
    setSelectedVariant("")
  }

  const requiresAdvanceNotice = product.categoryId === "pudins" && product.id !== "pudim-mini"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square relative">
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          fallbackSrc="/placeholder.svg"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-xl font-bold text-pink-600">{formatCurrency(product.price)}</p>
          {requiresAdvanceNotice && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">Este item requer 48h de antecedência.</p>
          )}
        </div>

        {product.variants && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Sabor:</label>
            <Select value={selectedVariant} onValueChange={setSelectedVariant}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sabor" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id}>
                    {variant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Quantidade:</label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="tel"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-20 text-center"
            />
            <Button variant="outline" size="sm" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
          Adicionar
        </Button>
      </CardContent>
    </Card>
  )
}
