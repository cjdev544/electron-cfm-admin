import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { rebuildClientApp } from '../../../../../helpers/rebuildClientApp'
import useRestaurants from '../../../../../hooks/useRestaurants'

export default function useCreateCategory() {
  const {
    restaurants,
    setRestaurants,
    updateCategoriesRestaurant,
    getRestaurants,
  } = useRestaurants()

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [existentCategories, setExistentCategories] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [restaurantSelected, setRestaurantSelected] = useState(null)
  const [restaurantForChange, setRestaurantForChange] = useState(null)

  useEffect(() => {
    getRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (restaurantSelected) {
      const categoriesForRestaurantSelected = restaurants?.filter(
        (restaurant) => restaurant.page === restaurantSelected
      )
      setExistentCategories(categoriesForRestaurantSelected[0].categories)
    }
  }, [restaurantSelected, restaurants])

  const allRestaurants = restaurants?.map((rest) => ({
    key: rest?.position,
    value: rest?.page,
    text: rest?.name,
  }))

  const handleRestaurantSelect = (e, option) => {
    setRestaurantSelected(option.value)
    const restaurant = restaurants.filter(
      (restaurant) => restaurant.page === option.value
    )
    setRestaurantForChange(restaurant[0])
  }

  const handleChange = (e) => {
    setNewCategory(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    if (!restaurantSelected) {
      toast.error('Debes seleccionar un restaurante')
      setIsLoading(false)
      return null
    }

    if (!newCategory) {
      toast.error('El nombre de la nueva categoría es oblogatorio')
      setIsLoading(false)
      return null
    }

    const categoryExist = existentCategories?.filter(
      (category) => category.toLowerCase() === newCategory.toLowerCase()
    )
    if (categoryExist[0]) {
      toast.error('Esta categoría ya existe en el restaurante seleccionado')
      setIsLoading(false)
      return null
    }

    const capitalizeCategory =
      newCategory[0].toUpperCase() + newCategory.slice(1)
    const changeCategories = [capitalizeCategory, ...existentCategories]

    const uploadCategory = await updateCategoriesRestaurant(
      restaurantForChange,
      changeCategories,
      'creada',
      'crear'
    )

    const restaurantsWithChange = restaurants.map((restaurant) =>
      restaurant.page === uploadCategory?.page ? uploadCategory : restaurant
    )
    setRestaurants(restaurantsWithChange)
    setIsLoading(false)
    rebuildClientApp(`/${restaurantSelected}`)
    navigate('/settings')
  }

  return {
    isLoading,
    allRestaurants,
    newCategory,
    handleRestaurantSelect,
    handleChange,
    handleSubmit,
  }
}
