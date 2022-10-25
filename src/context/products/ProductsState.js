import { useState } from 'react'
import ProductsContext from './productsContext'

export default function ProductsState({ children }) {
  const [products, setProducts] = useState(null)

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
