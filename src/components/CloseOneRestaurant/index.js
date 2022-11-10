import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import { rebuildClientApp } from '../../helpers/rebuildClientApp'
import useRestaurants from '../../hooks/useRestaurants'
import RestItem from './components/RestItem'
import style from './CloseOneRestaurant.module.css'

export default function CloseOneRestaurant() {
  const navigate = useNavigate()
  const {
    restaurants,
    setRestaurants,
    getRestaurants,
    openOrCloseRestaurants,
  } = useRestaurants()

  const [formData, setFormData] = useState(restaurants)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFormData(restaurants)
  }, [restaurants])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    restaurants.forEach((rest, i) => {
      if (rest.id === formData[i].id) {
        if (rest.isOpen !== formData[i].isOpen) {
          openOrCloseRestaurants(formData[i], setIsLoading).then((res) => {
            if (res) {
              setRestaurants(formData)
            }
            rebuildClientApp(`/${formData[i].page}`)
            navigate('/settings')
          })
        }
      }
    })

    const restaurantsChanges = await getRestaurants()
    setRestaurants(restaurantsChanges)
  }

  return (
    <div className={style.container}>
      <h1>Cerrar y abrir los restaurantes</h1>
      <Form onSubmit={handleSubmit}>
        {restaurants?.map((rest) => (
          <RestItem
            key={rest.id}
            rest={rest}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        <Button type='submit' loading={isLoading}>
          Guardar cambios
        </Button>
      </Form>
    </div>
  )
}
