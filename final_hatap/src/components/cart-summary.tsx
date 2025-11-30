"use client"

import type { Product } from "@/lib/types"

interface CartSummaryProps {
  products: Product[]
}

export default function CartSummary({ products }: CartSummaryProps) {
  const calculations = products.reduce(
    (acc, product) => {
      const subtotal = product.price * product.quantity
      return {
        totalItems: acc.totalItems + product.quantity,
        totalSubtotal: acc.totalSubtotal + subtotal,
        averagePrice: acc.totalItems > 0 ? (acc.totalSubtotal + subtotal) / (acc.totalItems + product.quantity) : 0,
      }
    },
    { totalItems: 0, totalSubtotal: 0, averagePrice: 0 },
  )

  const tax = calculations.totalSubtotal * 0.1 // 10% tax
  const total = calculations.totalSubtotal + tax

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-4">Cart Summary</h2>

      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Items:</span>
          <span className="font-semibold text-foreground">{calculations.totalItems}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Products:</span>
          <span className="font-semibold text-foreground">{products.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Average Price per Item:</span>
          <span className="font-semibold text-foreground">${calculations.averagePrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-base">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-semibold text-foreground">${calculations.totalSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-muted-foreground">Tax (10%):</span>
          <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold pt-4 border-t border-border">
        <span className="text-foreground">Total:</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      <button className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
        Proceed to Checkout
      </button>
    </div>
  )
}
