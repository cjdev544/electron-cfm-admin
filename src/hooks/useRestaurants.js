import { useContext, useEffect } from 'react'

import RestaurantsContext from '../context/restaurants/restaurantsContext'
import { updateCategoryInProductServices } from '../services/products'
import {
  getRestaurantsServices,
  openOrCloseRestaurantsServices,
  updateCategoriesRestaurantServices,
} from '../services/restaurants'

export default function useRestaurants() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext)

  useEffect(() => {
    if (!restaurants) {
      getRestaurants()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRestaurants = async () => {
    const restaurants = await getRestaurantsServices()
    setRestaurants(restaurants)
  }

  const updateCategoriesRestaurant = async (
    restaurant,
    categories,
    success,
    error
  ) => {
    await updateCategoriesRestaurantServices(
      restaurant,
      categories,
      success,
      error
    )
  }

  const openOrCloseRestaurants = async (restaurant, setIsLoading) => {
    openOrCloseRestaurantsServices(restaurant, setIsLoading)
  }

  const updateCategoryInProduct = async (product, newCategory) => {
    updateCategoryInProductServices(product, newCategory)
  }

  return {
    restaurants,
    setRestaurants,
    getRestaurants,
    updateCategoriesRestaurant,
    updateCategoryInProduct,
    openOrCloseRestaurants,
  }
}
