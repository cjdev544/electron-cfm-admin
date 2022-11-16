import { Button, Form } from 'semantic-ui-react'

import useDeleteCategory from './hook/useDeleteCategory'
import style from './DeleteCategory.module.css'

export default function DeleteCategory() {
  const {
    isLoading,
    allRestaurants,
    restaurante,
    categories,
    categoria,
    handleRestaurantSelect,
    handleCategorySelect,
    handleSubmit,
  } = useDeleteCategory()

  return (
    <div className={style.container}>
      <h2>Eliminar categoría</h2>
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
              label='Selecciona la categoría a eliminar'
              placeholder='Categoría'
              options={categories}
              onChange={handleCategorySelect}
            />
          )}
        </Form.Group>
        <p className={style.alert}>
          ADVERTENCIA!!! TODOS LOS PRODUCTOS QUE SE ENCUENTREN EN ESTA CATEGORÍA
          SERÁN ELIMINADOS DEFINITIVAMENTE
        </p>
        {categoria && (
          <Button type='submit' loading={isLoading}>
            Eliminar
          </Button>
        )}
      </Form>
    </div>
  )
}
