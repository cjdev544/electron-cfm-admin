import { useState, useEffect } from 'react'
import { Radio } from 'semantic-ui-react'

import style from './RestItem.module.css'

function RestItem({ rest, formData, setFormData }) {
  const [restaurant, setRestaurant] = useState(rest)

  useEffect(() => {
    const array = formData?.map((rest) =>
      rest.id !== restaurant.id ? rest : restaurant
    )
    setFormData(array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant])

  const handleRadio = (e, { checked }) => {
    setRestaurant({ ...restaurant, isOpen: checked })
  }

  return (
    <div className={style.item}>
      <h2 className={style.title}>{rest.name}</h2>
      <div className={style.box}>
        <span className={style.span}>Cerrado</span>
        <Radio toggle checked={restaurant.isOpen} onChange={handleRadio} />
        <span className={style.span}>Abierto</span>
      </div>
    </div>
  )
}

export default RestItem
