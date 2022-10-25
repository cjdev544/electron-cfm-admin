import { useContext, useEffect } from 'react'
import ProductsContext from '../context/products/productsContext'
import {
  addNewProductServices,
  deleteProductServices,
  getAllProductsServices,
  updateProductServices,
} from '../services/products'

export default function useProducts() {
  const { products, setProducts } = useContext(ProductsContext)

  useEffect(() => {
    if (!products) {
      getAllProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addNewProduct = (formData) => {
    addNewProductServices(formData).then((newProduct) => {
      setProducts([...products, newProduct])
    })
  }

  const updateProduct = (product, file) => {
    updateProductServices(product, file).then((productUpdated) => {
      const productsUpdated = products.map((prod) =>
        prod.id !== product.id ? prod : productUpdated
      )
      setProducts(productsUpdated)
    })
  }

  const deleteProduct = async (product) => deleteProductServices(product)

  const getAllProducts = async () => {
    const products = await getAllProductsServices()
    setProducts(products)
  }

  return {
    products,
    setProducts,
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
  }
}
