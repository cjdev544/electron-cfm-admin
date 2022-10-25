import { Form } from 'semantic-ui-react'

import useProductSelect from './hook/useProductSelect'

export default function ProductSelect({ setSelectedProduct }) {
  const {
    allRestaurants,
    categories,
    restaurantOptions,
    categorySelected,
    productForSelect,
    handleCategorySelect,
    handleProductSelect,
    handleRestaurantSelect,
  } = useProductSelect(setSelectedProduct)

  return (
    <Form className='createAndChangeProduct'>
      <Form.Group widths='equal'>
        <Form.Select
          label='Selecciona el restaurante'
          placeholder='Restaurante'
          options={allRestaurants}
          onChange={handleRestaurantSelect}
        />
        {restaurantOptions && categories && (
          <Form.Select
            label='Selecciona la categoría del plato'
            placeholder='Categoría'
            options={categories}
            onChange={handleCategorySelect}
          />
        )}
      </Form.Group>
      {categorySelected && productForSelect && (
        <Form.Dropdown
          label='Selecciona el producto'
          placeholder='Producto'
          fluid
          search
          selection
          lazyLoad
          options={productForSelect}
          onChange={handleProductSelect}
        />
      )}
    </Form>
  )
}
