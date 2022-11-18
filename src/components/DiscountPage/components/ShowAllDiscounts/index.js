import { useEffect, useState } from 'react'

import useDiscount from '../../../../hooks/useDiscount'
import style from './ShowAllDiscounts.module.css'

export default function ShowAllDiscounts() {
  const { discounts } = useDiscount()

  const [discAll, setDiscAll] = useState(null)
  const [discClient, setDiscClient] = useState(null)

  useEffect(() => {
    if (discounts) {
      const allRestaurants = discounts.filter(
        (disc) => disc.discountFor === 'all'
      )
      const client = discounts.filter((disc) => disc.discountFor === 'client')

      setDiscAll(allRestaurants)
      setDiscClient(client)
    }
  }, [discounts])

  if (!discounts) return null

  return (
    <div className={style.container}>
      <h1>Todos los descuentos</h1>
      {discAll?.length && (
        <>
          <h3>Cupones aplicados a todos los restaurantes</h3>
          <div className={style.flex}>
            {discAll.map((disc) => (
              <div key={disc.id} className={style.item}>
                <p>
                  Nombre: <span>{disc.name}</span>
                </p>
                <p>
                  Descuento: <span>{` ${disc.discount}%`}</span>
                </p>
                {disc.type === 'date' && (
                  <>
                    <p>
                      Valido hasta: <span>{disc.dateFormat}</span>
                    </p>
                    <p>
                      Ha sido utilizado: <span>{disc.use}</span>
                    </p>
                  </>
                )}
                {disc.type === 'use' && (
                  <>
                    <p>
                      Se puede utilizar: <span>{disc.expNumber}</span>
                    </p>
                    <p>
                      Restan: <span>{disc.expNumber - disc.use}</span>
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {discClient?.length && (
        <>
          <h3>Cupones aplicados a clientes especificos</h3>
          <div className={style.flex}>
            {discClient.map((disc) => (
              <div key={disc.id} className={style.item}>
                <p>
                  Nombre: <span>{disc.name}</span>
                </p>
                <p>
                  Descuento: <span>{` ${disc.discount}%`}</span>
                </p>
                <p>
                  Cliente: <span>{disc.clientEmail}</span>
                </p>
                {disc.type === 'date' && (
                  <p>
                    Valido hasta: <span>{disc.dateFormat}</span>
                  </p>
                )}
                {disc.type === 'use' && (
                  <>
                    <p>
                      Se puede utilizar: <span>{disc.expNumber} veces</span>
                    </p>
                    <p>
                      Restan: <span>25</span>
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
