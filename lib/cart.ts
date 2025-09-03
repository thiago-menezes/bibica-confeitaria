import type { CartItem } from "./data"

export const CART_STORAGE_KEY = "bibica_cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(item: Omit<CartItem, "qty"> & { qty?: number }): void {
  const cart = getCart()
  const existingIndex = cart.findIndex(
    (cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId,
  )

  if (existingIndex >= 0) {
    cart[existingIndex].qty += item.qty || 1
  } else {
    cart.push({ ...item, qty: item.qty || 1 })
  }

  saveCart(cart)
}

export function updateCartItemQty(productId: string, variantId: string | undefined, qty: number): void {
  const cart = getCart()
  const itemIndex = cart.findIndex((item) => item.productId === productId && item.variantId === variantId)

  if (itemIndex >= 0) {
    if (qty <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].qty = qty
    }
    saveCart(cart)
  }
}

export function removeFromCart(productId: string, variantId?: string): void {
  const cart = getCart()
  const filtered = cart.filter((item) => !(item.productId === productId && item.variantId === variantId))
  saveCart(filtered)
}

export function clearCart(): void {
  saveCart([])
}

export function calculateDiscount(cart: CartItem[]): {
  eligibleItems: CartItem[]
  eligibleQty: number
  eligibleSubtotal: number
  ineligibleSubtotal: number
  discount: number
  subtotal: number
} {
  const eligibleItems = cart.filter((item) => {
    // Check if product is discount eligible (trufas and geladinhos)
    return item.productId.startsWith("trufa-") || item.productId.startsWith("gelado-")
  })

  const eligibleQty = eligibleItems.reduce((sum, item) => sum + item.qty, 0)
  const eligibleSubtotal = eligibleItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)

  const ineligibleItems = cart.filter(
    (item) => !item.productId.startsWith("trufa-") && !item.productId.startsWith("gelado-"),
  )
  const ineligibleSubtotal = ineligibleItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)

  const discount = eligibleQty >= 20 ? eligibleSubtotal * 0.1 : 0
  const subtotal = eligibleSubtotal + ineligibleSubtotal

  return {
    eligibleItems,
    eligibleQty,
    eligibleSubtotal,
    ineligibleSubtotal,
    discount,
    subtotal,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
