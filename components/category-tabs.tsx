"use client"

import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const scrollToCategory = (categoryId: string) => {
    onCategoryChange(categoryId)
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
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
