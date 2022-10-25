import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getAllCostsShippingServices,
  updateCostShippingServices,
} from '../../../../../services/costShipping'

export default function useShipping(title) {
  const navigate = useNavigate()

  const allDistances = {
    '2 a 6km': 'Costo por envio de 2 a 6 kilometros',
    '0 a 2km': 'Costo por envio de 0 a 2 kilometros',
    '6 a 10km': 'Costo por envio de 6 a 10 kilometros',
  }
  const selectionDistance = allDistances[title] || null

  const [costsShipping, setCostsShipping] = useState(null)
  const [newCost, setNewCost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    selectDistance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  const selectDistance = async () => {
    const res = await getAllCostsShippingServices()
    const distanceSelected = res.find((element) => element.distancia === title)
    setCostsShipping(distanceSelected)
    setNewCost(distanceSelected.costo)
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    const data = {
      ...costsShipping,
      costo: newCost,
    }
    await updateCostShippingServices(data.id, data)
    setIsLoading(false)
    navigate('/settings')
  }

  return {
    isLoading,
    newCost,
    costsShipping,
    selectionDistance,
    setNewCost,
    handleSubmit,
  }
}
