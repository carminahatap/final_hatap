"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import ProductDetailModal from "./product-detail-modal"

interface ProductCardProps {
  product: Product
  onUpdateQuantity: (productId: string, newQuantity: number) => void
}

export default function ProductCard({ product, onUpdateQuantity }: ProductCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const { addToCart } = useCart()
  const isLowStock = product.quantity < 5
  const subtotal = product.price * product.quantity

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {/* Product Image */}
        <div className="relative h-48 bg-muted overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {isLowStock && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-lg line-clamp-2 mb-2">{product.name}</h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">⭐ {product.rating}</div>
          </div>

          {/* Quantity and Subtotal */}
          <div className="bg-muted p-3 rounded mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Quantity: {product.quantity}</span>
              <span className="text-sm font-semibold text-foreground">Subtotal: ${subtotal.toFixed(2)}</span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                className="px-3 py-1 bg-background hover:bg-border text-foreground rounded transition-colors"
                disabled={product.quantity <= 1}
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-medium">{product.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                className="px-3 py-1 bg-background hover:bg-border text-foreground rounded transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsDetailOpen(true)}
              className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={product}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={() => setIsDetailOpen(false)}
      />
    </>
  )
}
