import { createDiscountServices } from '../services/discount'

export default function useDiscount() {
  const createDiscount = (discountData, setIsLoading) =>
    createDiscountServices(discountData, setIsLoading)

  return {
    createDiscount,
  }
}
