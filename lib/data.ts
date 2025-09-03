// Product data structure for Bibica Confeitaria
export interface Product {
  id: string
  categoryId: string
  name: string
  description: string
  price: number
  imageUrl: string
  discountEligible: boolean
  variants?: Array<{
    id: string
    label: string
  }>
}

export interface Category {
  id: string
  name: string
}

export interface CartItem {
  productId: string
  variantId?: string
  unitPrice: number
  qty: number
  name: string
  variant?: string
}

export const categories: Category[] = [
  { id: "trufas", name: "Trufas" },
  { id: "pudins", name: "Pudins" },
  { id: "geladinhos", name: "Geladinhos" },
]

export const products: Product[] = [
  // Trufas
  {
    id: "trufa-classica-70",
    categoryId: "trufas",
    name: "Clássica 70%",
    description: "Ganache de chocolate 70% com toque de baunilha.",
    price: 6.0,
    imageUrl: "/chocolate-truffle-with-ganache-filling.png",
    discountEligible: true,
  },
  {
    id: "trufa-avela",
    categoryId: "trufas",
    name: "Avelã Cremosa",
    description: "Recheio de avelã tostada com chocolate ao leite.",
    price: 6.5,
    imageUrl: "/hazelnut-chocolate-truffle.png",
    discountEligible: true,
  },
  {
    id: "trufa-doce-leite",
    categoryId: "trufas",
    name: "Doce de Leite & Flor de Sal",
    description: "Equilíbrio perfeito entre doce e salgado.",
    price: 6.5,
    imageUrl: "/dulce-de-leche-truffle-with-sea-salt.png",
    discountEligible: true,
  },
  {
    id: "trufa-brigadeiro",
    categoryId: "trufas",
    name: "Brigadeiro Belga",
    description: "Brigadeiro gourmet com cobertura de cacau.",
    price: 6.0,
    imageUrl: "/brazilian-brigadeiro-truffle-with-cocoa.png",
    discountEligible: true,
  },
  {
    id: "trufa-cafe",
    categoryId: "trufas",
    name: "Café & Caramelo",
    description: "Ganache de café especial com caramelo amanteigado.",
    price: 6.5,
    imageUrl: "/coffee-caramel-truffle.png",
    discountEligible: true,
  },
  {
    id: "trufa-frutas",
    categoryId: "trufas",
    name: "Frutas Vermelhas",
    description: "Ganache branca com compota artesanal.",
    price: 6.5,
    imageUrl: "/white-chocolate-truffle-with-red-berries.png",
    discountEligible: true,
  },

  // Pudins
  {
    id: "pudim-mini",
    categoryId: "pudins",
    name: "Mini Pudim (120 ml)",
    description: "Tradicional com calda de caramelo.",
    price: 12.0,
    imageUrl: "/mini-flan-pudding-with-caramel-sauce.png",
    discountEligible: false,
  },
  {
    id: "pudim-p",
    categoryId: "pudins",
    name: "Pudim P (600-700g)",
    description: "Serve 6–8 porções.",
    price: 45.0,
    imageUrl: "/medium-flan-pudding-dessert.png",
    discountEligible: false,
    variants: [
      { id: "tradicional", label: "Tradicional" },
      { id: "ninho", label: "Leite Ninho" },
      { id: "doce-de-leite", label: "Doce de Leite" },
      { id: "chocolate", label: "Chocolate" },
    ],
  },
  {
    id: "pudim-g",
    categoryId: "pudins",
    name: "Pudim G (1-1,2kg)",
    description: "Serve 12–14 porções.",
    price: 65.0,
    imageUrl: "/large-flan-pudding-dessert.png",
    discountEligible: false,
    variants: [
      { id: "tradicional", label: "Tradicional" },
      { id: "ninho", label: "Leite Ninho" },
      { id: "doce-de-leite", label: "Doce de Leite" },
      { id: "chocolate", label: "Chocolate" },
    ],
  },

  // Geladinhos
  {
    id: "gelado-ninho",
    categoryId: "geladinhos",
    name: "Leite Ninho Cremoso",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/creamy-milk-popsicle.png",
    discountEligible: true,
  },
  {
    id: "gelado-chocolate",
    categoryId: "geladinhos",
    name: "Chocolate Cremoso",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/creamy-chocolate-popsicle.png",
    discountEligible: true,
  },
  {
    id: "gelado-morango",
    categoryId: "geladinhos",
    name: "Morango com Nata",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/strawberry-cream-popsicle.png",
    discountEligible: true,
  },
  {
    id: "gelado-maracuja",
    categoryId: "geladinhos",
    name: "Maracujá",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/passion-fruit-popsicle.png",
    discountEligible: true,
  },
  {
    id: "gelado-coco",
    categoryId: "geladinhos",
    name: "Coco Queimado",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/burnt-coconut-popsicle.png",
    discountEligible: true,
  },
  {
    id: "gelado-doce-leite",
    categoryId: "geladinhos",
    name: "Doce de Leite",
    description: "Receita cremosa, sabor de infância com toque gourmet.",
    price: 6.0,
    imageUrl: "/dulce-de-leche-popsicle.png",
    discountEligible: true,
  },
]
