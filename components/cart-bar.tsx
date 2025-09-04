"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCart, calculateDiscount, formatCurrency } from "@/lib/cart"
import type { CartItem } from "@/lib/data"

export function CartBar() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setCart(getCart())

    // Listen for cart updates
    const handleStorageChange = () => {
      setCart(getCart())
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  if (!isClient || cart.length === 0) {
    return null
  }

  const { subtotal, discount } = calculateDiscount(cart)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const finalTotal = subtotal - discount

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg cart-bar-mobile">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex items-center space-x-2">
              <ShoppingCart className={`h-5 w-5 text-pink-500 ${isAnimating ? "animate-cart-bounce" : ""}`} />
              <span className="font-medium text-sm sm:text-base">
                {totalItems} {totalItems === 1 ? "item" : "itens"}
              </span>
            </div>
            <div className="text-lg font-bold text-pink-600 truncate">{formatCurrency(finalTotal)}</div>
          </div>
          <Button
            asChild
            className="bg-pink-500 hover:bg-pink-600 text-white shrink-0 text-sm sm:text-base px-4 sm:px-6"
          >
            <Link href="/encomenda">Concluir encomenda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
