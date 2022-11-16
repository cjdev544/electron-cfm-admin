import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../firebase/config'

export const getRestaurantsServices = async () => {
  const array = []
  const q = query(collection(db, 'restaurants'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}

export const updateCategoriesRestaurantServices = async (
  restaurant,
  categories,
  success,
  error
) => {
  const restaurantRef = doc(db, 'restaurants', restaurant.id)
  try {
    await updateDoc(restaurantRef, { ...restaurant, categories })
    if (success) toast.success(`Categoría ${success} correctamente`)
    return { ...restaurant, categories }
  } catch (err) {
    console.log(err)
    toast.error(`Error al ${error} la categoría`)
    return null
  }
}

export const openOrCloseRestaurantsServices = async (
  restaurant,
  setIsLoading
) => {
  const restaurantRef = doc(db, 'restaurants', restaurant.id)
  try {
    await updateDoc(restaurantRef, restaurant)
    toast.success(`Cambio en ${restaurant.name} exitoso`)
    setIsLoading(false)
    return true
  } catch (err) {
    console.log(err)
    toast.error(`Error al cambiar el estado de ${restaurant.name}`)
    setIsLoading(false)
    return null
  }
}
