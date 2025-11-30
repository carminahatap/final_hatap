"use client"

import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

interface ProductListProps {
  products: Product[]
  onUpdateQuantity: (productId: string, newQuantity: number) => void
}

export default function ProductList({ products, onUpdateQuantity }: ProductListProps) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onUpdateQuantity={onUpdateQuantity} />
      ))}
    </>
  )
}
