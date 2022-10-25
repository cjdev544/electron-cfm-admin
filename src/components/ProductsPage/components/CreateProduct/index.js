import ProductForm from '../ProductForm'
import style from './CreateProduct.module.css'

export default function CreateProduct() {
  return (
    <div className={style.container}>
      <h2>Crear producto</h2>
      <ProductForm />
    </div>
  )
}
