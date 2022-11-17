import { useEffect, useState } from 'react'

import {
  createDiscountServices,
  getDiscountsServices,
  deleteDiscountServices,
} from '../services/discount'

export default function useDiscount() {
  const [discounts, setDiscounts] = useState(null)

  useEffect(() => {
    getDiscounts()
  }, [])

  const createDiscount = (discountData, setIsLoading) =>
    createDiscountServices(discountData, setIsLoading)

  const getDiscounts = async () => {
    const res = await getDiscountsServices()
    setDiscounts(res)
  }

  const deleteDiscount = (discountId, setIsLoading) =>
    deleteDiscountServices(discountId, setIsLoading)

  return {
    discounts,
    createDiscount,
    deleteDiscount,
  }
}
