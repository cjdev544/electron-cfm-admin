import { useState } from 'react'
import RestaurantsContext from './restaurantsContext'

export default function RestaurantsState({ children }) {
  const [restaurants, setRestaurants] = useState(null)

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  )
}
