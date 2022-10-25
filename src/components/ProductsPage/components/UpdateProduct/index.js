import { useState } from 'react'

import ProductForm from '../ProductForm'
import ProductSelect from '../ProductSelect'
import style from './UpdateProduct.module.css'

export default function ChangeProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className={style.container}>
      <h2>Selección del producto a cambiar</h2>
      <ProductSelect setSelectedProduct={setSelectedProduct} />
      {selectedProduct && (
        <>
          <h2>Cambio de producto</h2>
          <ProductForm product={selectedProduct} />
        </>
      )}
    </div>
  )
}
