import { Button, Form } from 'semantic-ui-react'

import useHomeAdminPage from './hook/useHomeAdminPage'
import style from './HomeAdminPage.module.css'

export default function HomeAdminPage() {
  const {
    isLoading,
    sectionTitle,
    oldProductsSelected,
    optionProducts,
    setSectionTitle,
    setProductsSelected,
    handleSubmit,
  } = useHomeAdminPage()

  return (
    <div className={style.container}>
      <h2>Productos de la página principal</h2>
      <Form className='multipleSelectionSection' onSubmit={handleSubmit}>
        <Form.Input
          label='Título de la sección'
          type='text'
          name='sectionTitle'
          value={sectionTitle}
          autoFocus
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <h4>Productos que estan en esta sección</h4>
        {oldProductsSelected?.length >= 1 && (
          <div className={style.products}>
            {oldProductsSelected.map((product) => (
              <div key={product?.id} className={style.product}>
                {product?.nombre}
              </div>
            ))}
          </div>
        )}
        <Form.Dropdown
          label='Selección multiple de productos'
          placeholder='Buscar producto'
          fluid
          multiple
          search
          selection
          options={optionProducts}
          onChange={(e, option) => setProductsSelected(option.value)}
        />
        <Button type='submit' loading={isLoading}>
          Actualizar
        </Button>
      </Form>
    </div>
  )
}
