import type { CartItem } from "./data"
import { formatCurrency } from "./cart"

const PHONE = "5511999999999" // Replace with actual WhatsApp number

export interface OrderData {
  name: string
  phone: string
  email?: string
  deliveryType: "delivery" | "pickup"
  address?: string
  neighborhood?: string
  city?: string
  date: string
  timeWindow?: string
  paymentMethod: string
  observations?: string
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  orderData: OrderData,
  discount: number,
  total: number,
): string {
  const itemsList = cart
    .map((item) => {
      const variant = item.variant ? ` ${item.variant}` : ""
      const subtotal = formatCurrency(item.unitPrice * item.qty)
      return `• ${item.name}${variant} — ${item.qty} un — ${subtotal}`
    })
    .join("\n")

  const discountText = discount > 0 ? "10% aplicado" : "—"
  const deliveryText = orderData.deliveryType === "delivery" ? "Entrega" : "Retirada"
  const addressText =
    orderData.deliveryType === "delivery" ? `${orderData.address}, ${orderData.neighborhood}, ${orderData.city}` : "—"

  return `Novo pedido – Bibica
Cliente: ${orderData.name}
WhatsApp: ${orderData.phone}
${orderData.email ? `E-mail: ${orderData.email}` : ""}

Itens:
${itemsList}

Desconto: ${discountText}
${deliveryText}: ${deliveryText}
Endereço: ${addressText}
Data/Janela: ${orderData.date}${orderData.timeWindow ? ` — ${orderData.timeWindow}` : ""}
Pagamento: ${orderData.paymentMethod}
Observações: ${orderData.observations || "—"}

Total: ${formatCurrency(total)}`
}

export function sendWhatsAppOrder(message: string): void {
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${PHONE}?text=${encodedMessage}`

  try {
    window.open(url, "_blank")
  } catch (error) {
    // Fallback: show the number for manual contact
    alert(`Não foi possível abrir o WhatsApp automaticamente. Entre em contato pelo número: ${PHONE}`)
  }
}
