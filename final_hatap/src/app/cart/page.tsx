"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart()

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)
  const tax = cartSubtotal * 0.1
  const total = cartSubtotal + tax

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground mt-1">{cartItems.length} items in your cart</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                </div>

                <div className="divide-y divide-border">
                  {cartItems.map((item) => {
                    const itemSubtotal = item.price * item.cartQuantity
                    return (
                      <div key={item.id} className="p-6 flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)} each</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                              className="px-3 py-1 bg-muted hover:bg-border text-foreground rounded transition-colors"
                              disabled={item.cartQuantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-4 py-1 bg-muted rounded text-foreground font-medium">
                              {item.cartQuantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                              className="px-3 py-1 bg-muted hover:bg-border text-foreground rounded transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="text-right">
                          <p className="font-semibold text-foreground text-lg">${itemSubtotal.toFixed(2)}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-sm text-destructive hover:underline font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-4">Cart Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items:</span>
                    <span className="font-semibold text-foreground">
                      {cartItems.reduce((sum, item) => sum + item.cartQuantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Products:</span>
                    <span className="font-semibold text-foreground">{cartItems.length}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold text-foreground">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Tax (10%):</span>
                    <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold pt-4 border-t border-border mb-4">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
