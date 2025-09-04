"use client"

import { Button } from "@/components/ui/button"
import useSWR from "swr"
import type { Category } from "@/lib/sheets"

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const { data: categories = [] } = useSWR<Category[]>('/api/categories', fetcher)
  
  if (categories.length === 0) {
    return null // Não renderiza nada se não tem categorias
  }
  const scrollToCategory = (categoryId: string) => {
    onCategoryChange(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container px-4 py-4">
        <div className="flex justify-center">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => scrollToCategory(category.id)}
                className={`
                  shrink-0 text-sm sm:text-base px-3 sm:px-4 py-2 focus-visible:focus-visible
                  ${
                    activeCategory === category.id
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"
                  }
                `}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
