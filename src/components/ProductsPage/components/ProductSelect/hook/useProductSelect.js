import { useEffect, useState } from 'react'

import useProducts from '../../../../../hooks/useProducts'
import useRestaurants from '../../../../../hooks/useRestaurants'

export default function useProductSelect(setSelectedProduct) {
  const { restaurants } = useRestaurants()
  const { products } = useProducts()

  const [restaurantOptions, setRestaurantOptions] = useState(null)
  const [categories, setCategories] = useState(null)
  const [categorySelected, setCategorySelected] = useState(null)
  const [productsList, setProductsList] = useState(products)
  const [productForSelect, setProductForSelect] = useState(null)

  useEffect(() => {
    if (restaurantOptions) {
      const restaurantSelected = restaurants?.filter(
        (restaurant) => restaurant?.page === restaurantOptions
      )
      const categoriesArray = restaurantSelected[0].categories
      setCategories(
        categoriesArray?.map((category) => ({
          key: category,
          value: category,
          text: category,
        }))
      )
      setProductsList(
        products?.filter((product) => product.restaurante === restaurantOptions)
      )

      setCategorySelected(null)
      setSelectedProduct(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantOptions, restaurants, products])

  useEffect(() => {
    if (categorySelected) {
      const productRestCategory = productsList?.filter(
        (product) => product.categoria === categorySelected
      )
      setProductForSelect(
        productRestCategory?.map((product) => ({
          key: product.id,
          value: product.id,
          text: product.nombre,
        }))
      )
    }
    setSelectedProduct(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected, productsList])

  const allRestaurants = restaurants?.map((rest) => ({
    key: rest?.position,
    value: rest?.page,
    text: rest?.name,
  }))

  const handleRestaurantSelect = (e, option) => {
    setRestaurantOptions(option.value)
  }

  const handleCategorySelect = (e, option) => {
    setCategorySelected(option.value)
  }

  const handleProductSelect = (e, option) => {
    const productSelect = productsList?.filter(
      (product) => product.id === option.value
    )
    setSelectedProduct(productSelect[0])
  }

  return {
    allRestaurants,
    categories,
    restaurantOptions,
    categorySelected,
    productForSelect,
    handleCategorySelect,
    handleProductSelect,
    handleRestaurantSelect,
  }
}
