import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import useProducts from '../../../../hooks/useProducts'
import ProductSelect from '../ProductSelect'
import style from './DeleteProduct.module.css'

export default function DeleteProduct() {
  const navigate = useNavigate()
  const { deleteProduct } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    deleteProduct(selectedProduct).finally(() => setIsLoading(false))
    navigate('/settings')
  }

  return (
    <div className={style.container}>
      <h2>Selección el producto a eliminar</h2>
      <ProductSelect setSelectedProduct={setSelectedProduct} />
      {selectedProduct && (
        <>
          <h2>¿Seguro deseas eliminar el producto?</h2>
          <div className={style.box}>
            <div
              className={style.image}
              style={{ backgroundImage: `url('${selectedProduct.image}')` }}
            ></div>
          </div>
          <div>
            <h3>{selectedProduct.nombre}</h3>
            <p className={style.alert}>
              {' '}
              ALERTA!!!! SI SOLO QUIERES QUE NO APAREZCA EN LA WEB, DIRIJETE A
              LA SECCIÓN ADMINISTRADOR, CAMBIAR PRODUCTO, BUSCA EL PRODUCTO Y
              DESTILTA LA OPCIÓN PRODUCTO DISPONIBLE. DE LO CONTRARIO ESTARAS
              ELIMINANDO EL PRODUCTO DE LA BASE DE DATOS PARA SIEMPRE
            </p>
          </div>
          <Button loading={isLoading} onClick={handleClick}>
            Eliminar
          </Button>
        </>
      )}
    </div>
  )
}
