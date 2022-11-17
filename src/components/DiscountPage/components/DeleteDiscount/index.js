import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import useDiscount from '../../../../hooks/useDiscount'
import style from './DeleteDiscount.module.css'

export default function DeleteDiscount() {
  const navigate = useNavigate()

  const { discounts, deleteDiscount } = useDiscount()

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (discountId) => {
    setIsLoading(true)
    deleteDiscount(discountId, setIsLoading)
    navigate('/settings')
  }

  return (
    <div className={style.container}>
      <h1>Eliminar cupones</h1>
      {discounts?.length &&
        discounts.map((disc) => (
          <div key={disc.id} className={style.item}>
            <p>
              Nombre: <span>{disc.name}</span>
            </p>
            <Button onClick={() => handleClick(disc.id)} loading={isLoading}>
              Eliminar cupon
            </Button>
          </div>
        ))}
    </div>
  )
}
