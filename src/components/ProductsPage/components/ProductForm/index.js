import { Button, Form, Image, Radio } from 'semantic-ui-react'

import useForm from './hook/useForm'
import NoImage from '../../../../assets/png/no-image.png'

export default function ProductForm({ product }) {
  const {
    nombre,
    precio,
    image,
    descripcion,
    disponible,
    restaurante,
    categories,
    allRestaurants,
    isLoading,
    handleSubmit,
    handleRestaurantSelect,
    handleCategorySelect,
    handleRadio,
    handleChange,
    handlePathAndName,
    getRootProps,
    getInputProps,
  } = useForm(product)

  return (
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
            label='Selecciona la categoría del plato'
            placeholder='Categoría'
            options={categories}
            onChange={handleCategorySelect}
          />
        )}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          label='Nombre del plato'
          type='text'
          name='nombre'
          value={nombre}
          onChange={handlePathAndName}
        />
        <Form.Input
          label='Precio'
          type='number'
          name='precio'
          value={precio}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.TextArea
        label='Descripción'
        name='descripcion'
        value={descripcion}
        onChange={handleChange}
      />
      <p className='radio-product'>Producto disponible</p>
      <Radio toggle checked={disponible} onChange={handleRadio} />
      <div className='image-form'>
        <div className='image-form'>
          <div
            {...getRootProps()}
            className='image'
            style={{ backgroundImage: `url('${image}')` }}
          >
            <input {...getInputProps()} />
            {!image && <Image src={NoImage} />}
          </div>
        </div>
      </div>
      <Button type='submit' loading={isLoading}>
        Enviar
      </Button>
    </Form>
  )
}
