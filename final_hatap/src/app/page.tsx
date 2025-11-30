"use client"

import { useState } from "react"
import ProductList from "@/components/product-list"
import AddProductModal from "@/components/add-product-modal"
import Navbar from "@/components/navbar"
import type { Product } from "@/lib/types"

// Default products for initial display
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "/wireless-headphones.png",
    price: 79.99,
    quantity: 8,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    specifications: "Bluetooth 5.0, 30-hour battery life, active noise cancellation",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Coffee Maker",
    image: "/modern-coffee-maker.png",
    price: 49.99,
    quantity: 3,
    category: "Appliances",
    description: "Smart coffee maker with programmable brew times",
    specifications: "12-cup capacity, programmable timer, thermal carafe",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Desk Lamp",
    image: "/modern-desk-lamp.png",
    price: 29.99,
    quantity: 12,
    category: "Lighting",
    description: "LED desk lamp with adjustable brightness and color temperature",
    specifications: "LED technology, USB charging, 5 brightness levels",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    image: "/mechanical-keyboard.png",
    price: 129.99,
    quantity: 2,
    category: "Electronics",
    description: "Premium mechanical keyboard with RGB backlighting",
    specifications: "Cherry MX switches, RGB lighting, aluminum frame",
    rating: 4.8,
  },
  {
    id: "5",
    name: "Phone Stand",
    image: "/phone-stand.jpg",
    price: 14.99,
    quantity: 25,
    category: "Accessories",
    description: "Adjustable phone stand for all device sizes",
    specifications: "Universal fit, aluminum construction, 360° rotation",
    rating: 4.3,
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    }
    setProducts([...products, product])
    setIsModalOpen(false)
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) return
    setProducts(products.map((p) => (p.id === productId ? { ...p, quantity: newQuantity } : p)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar onAddProductClick={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors capitalize ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductList products={filteredProducts} onUpdateQuantity={handleUpdateQuantity} />
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddProduct} />
    </div>
  )
}
