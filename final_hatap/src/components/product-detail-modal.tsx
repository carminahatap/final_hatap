"use client"

import type { Product } from "@/lib/types"

interface ProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-foreground">Product Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Image */}
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{product.name}</h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg text-muted-foreground">Rating:</span>
                <span className="text-2xl">⭐ {product.rating}</span>
              </div>

              <div className="mb-6">
                <span className="text-lg text-muted-foreground">Category:</span>
                <span className="ml-2 inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-muted-foreground">In Stock:</span>
                <p className="text-lg font-semibold text-foreground">{product.quantity} units</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Description</h4>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-foreground mb-2">Specifications</h4>
            <p className="text-muted-foreground">{product.specifications}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onAddToCart}
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
