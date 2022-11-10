import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { rebuildClientApp } from '../../../../../helpers/rebuildClientApp'
import useRestaurants from '../../../../../hooks/useRestaurants'
import useProducts from '../../../../../hooks/useProducts'

export default function useDeleteCategory() {
  const navigate = useNavigate()
  const {
    restaurants,
    setRestaurants,
    updateCategoriesRestaurant,
    getRestaurants,
  } = useRestaurants()
  const { products, setProducts, getAllProducts, deleteProduct } = useProducts()

  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [existentCategories, setExistentCategories] = useState(null)
  const [restaurantForChange, setRestaurantForChange] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    restaurante: '',
  })
  const { restaurante, categoria } = formData
  useEffect(() => {
    getRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (restaurante) {
      const restaurantSelected = restaurants?.find(
        (restaurant) => restaurant?.page === restaurante
      )
      const categoriesArray = restaurantSelected?.categories
      setExistentCategories(restaurantSelected?.categories)
      setCategories(
        categoriesArray?.map((category) => ({
          key: category,
          value: category,
          text: category,
        }))
      )
    }
  }, [restaurante, restaurants])

  const allRestaurants = restaurants?.map((rest) => ({
    key: rest?.position,
    value: rest?.page,
    text: rest?.name,
  }))

  const handleRestaurantSelect = (e, option) => {
    setFormData({
      ...formData,
      restaurante: option.value,
    })
    const restaurant = restaurants.filter(
      (restaurant) => restaurant.page === option.value
    )
    setRestaurantForChange(restaurant[0])
  }

  const handleCategorySelect = (e, option) => {
    setFormData({
      ...formData,
      categoria: option.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    if (!restaurante) {
      toast.error('Debes seleccionar un restaurante')
      setIsLoading(false)
      return null
    }
    if (!categoria) {
      toast.error('Debes seleccionar una categoría')
      setIsLoading(false)
      return null
    }

    const changeCategories = existentCategories?.filter(
      (category) => category.toLowerCase() !== categoria.toLowerCase()
    )

    const uploadCategory = await updateCategoriesRestaurant(
      restaurantForChange,
      changeCategories,
      'eliminada',
      'eliminar'
    )

    const restaurantsWithChange = restaurants.map((restaurant) =>
      restaurant?.page === uploadCategory?.page ? uploadCategory : restaurant
    )
    setRestaurants(restaurantsWithChange)

    const restaurantProducts = products.filter(
      (product) => product.restaurante === restaurante
    )

    const deleteProductsCategory = restaurantProducts.filter(
      (product) => product.categoria === categoria
    )
    for await (const element of deleteProductsCategory) {
      deleteProduct(element)
    }

    const productsChange = await getAllProducts()
    setProducts(productsChange)

    setIsLoading(false)
    rebuildClientApp('/')
    rebuildClientApp(`/${restaurante}`)
    navigate('/settings')
  }

  return {
    isLoading,
    allRestaurants,
    restaurante,
    categories,
    categoria,
    handleRestaurantSelect,
    handleCategorySelect,
    handleSubmit,
  }
}
