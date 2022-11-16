import { Button, Form } from 'semantic-ui-react'

import useCreateCategory from './hook/useCreateCategory'
import style from './CreateCategory.module.css'

export default function CreateCategory() {
  const {
    isLoading,
    allRestaurants,
    newCategory,
    handleRestaurantSelect,
    handleChange,
    handleSubmit,
  } = useCreateCategory()

  return (
    <div className={style.container}>
      <h2>Crear categoría</h2>
      <Form className='createAndChangeProduct' onSubmit={handleSubmit}>
        <Form.Select
          label='Selecciona el restaurante'
          placeholder='Restaurante'
          options={allRestaurants}
          onChange={handleRestaurantSelect}
        />
        <Form.Input
          label='Nueva categoría'
          type='text'
          name='categoria'
          value={newCategory}
          onChange={handleChange}
        />
        <Button type='submit' loading={isLoading}>
          Enviar
        </Button>
      </Form>
    </div>
  )
}
