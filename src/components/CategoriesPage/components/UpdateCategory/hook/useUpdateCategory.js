import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import useRestaurants from '../../../../../hooks/useRestaurants'
import useProducts from '../../../../../hooks/useProducts'

export default function useUpdateCategory() {
  const {
    restaurants,
    setRestaurants,
    updateCategoriesRestaurant,
    getRestaurants,
  } = useRestaurants()
  const { products, setProducts, getAllProducts, updateProduct } = useProducts()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [existentCategories, setExistentCategories] = useState(null)
  const [restaurantForChange, setRestaurantForChange] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    restaurante: '',
  })
  const { restaurante, categoria, nombre } = formData

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      nombre: e.target.value,
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
    if (!nombre) {
      toast.error('Debes introducir un nombre a la categoría')
      setIsLoading(false)
      return null
    }

    const categoryExist = existentCategories?.filter(
      (category) => category.toLowerCase() === nombre.toLowerCase()
    )
    if (categoryExist[0]) {
      toast.error(
        'Ya existe otra categoría con este nombre en el restaurante seleccionado'
      )
      setIsLoading(false)
      return null
    }

    const capitalizeCategory = nombre[0].toUpperCase() + nombre.slice(1)
    const deleteCategoryForChange = existentCategories?.filter(
      (category) => category.toLowerCase() !== categoria.toLowerCase()
    )
    const changeCategories = [capitalizeCategory, ...deleteCategoryForChange]

    const uploadCategory = await updateCategoriesRestaurant(
      restaurantForChange,
      changeCategories,
      'cambiada',
      'cambiar'
    )

    const restaurantsWithChange = restaurants.map((restaurant) =>
      restaurant.page === uploadCategory?.page ? uploadCategory : restaurant
    )
    setRestaurants(restaurantsWithChange)

    const changeCategoryInProducts = products.filter(
      (product) => product.categoria === categoria
    )
    for await (const element of changeCategoryInProducts) {
      const productChangeCategory = { ...element, categoria: nombre }
      updateProduct(productChangeCategory, capitalizeCategory)
    }

    const productsChange = await getAllProducts()
    setProducts(productsChange)

    setIsLoading(false)
    navigate('/settings')
  }

  return {
    isLoading,
    allRestaurants,
    nombre,
    restaurante,
    categories,
    categoria,
    handleRestaurantSelect,
    handleCategorySelect,
    handleChange,
    handleSubmit,
  }
}
