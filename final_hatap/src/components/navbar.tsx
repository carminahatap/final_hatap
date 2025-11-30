"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

interface NavbarProps {
  onAddProductClick: () => void
}

export default function Navbar({ onAddProductClick }: NavbarProps) {
  const { cartItems, getTotalItems, removeFromCart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const totalItems = getTotalItems()

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">Product Manager</h1>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={onAddProductClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              + Add Product
            </button>

            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Shopping Cart</h3>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">Your cart is empty</div>
                    ) : (
                      <div className="space-y-2 p-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-foreground line-clamp-1">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.cartQuantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-border p-4">
                      <div className="flex justify-between mb-3 text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-semibold text-foreground">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <Link
                        href="/cart"
                        onClick={() => setIsCartOpen(false)}
                        className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
                      >
                        View All Cart
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
