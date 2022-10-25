import { Button, Form } from 'semantic-ui-react'

import useUpdateCategory from './hook/useUpdateCategory'
import style from './ChangeCategory.module.css'

const ChangeCategory = () => {
  const {
    isLoading,
    allRestaurants,
    nombre,
    restaurante,
    categories,
    categoria,
    handleRestaurantSelect,
    handleCategorySelect,
    handleChange,
    handleSubmit,
  } = useUpdateCategory()

  return (
    <div className={style.container}>
      <h2>Cambiar categoría</h2>
      <Form className='createAndChangeProduct' onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Select
            label='Selecciona el restaurante'
            placeholder='Restaurante'
            options={allRestaurants}
            onChange={handleRestaurantSelect}
          />
          {restaurante && categories && (
            <Form.Select
              label='Selecciona la categoría a cambiar'
              placeholder='Categoría'
              options={categories}
              onChange={handleCategorySelect}
            />
          )}
        </Form.Group>
        <p className={style.warnning}>
          ADVERTENCIA!!! TODOS LOS PRODUCTOS QUE SE ENCUENTRE EN ESTA CATEGORÍA
          SERÁN CAMBIADOS CON EL NOMBRE QUE SEA INTRODUCIDO
        </p>
        {categoria && (
          <>
            <Form.Input
              label='Nuevo nombre de la categoría'
              type='text'
              name='nombre'
              value={nombre}
              onChange={handleChange}
            />
            <Button type='submit' loading={isLoading}>
              Enviar
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}

export default ChangeCategory
