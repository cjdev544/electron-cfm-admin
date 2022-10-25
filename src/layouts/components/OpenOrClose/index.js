import { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import useIsOpen from '../../../hooks/useIsOpen'
import style from './OpenOrClose.module.css'

export default function OpenOrClose() {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, setIsOpen, updateOpenOrClose } = useIsOpen()

  const handleClick = (openOrClose) => {
    setIsLoading(true)
    updateOpenOrClose(openOrClose)
      .then(() => {
        setIsOpen(openOrClose)
        if (openOrClose) {
          toast.success('Restaurante abierto')
          setIsLoading(false)
        } else {
          toast.success('Restaurante cerrado')
          setIsLoading(false)
        }
      })
      .catch(() => {
        toast.error('Error en el servidor. Intentelo mas tarde')
        setIsLoading(false)
      })
  }

  if (isOpen === null) return <p>Cargando...</p>

  return (
    <div className={isOpen ? style.open : style.close}>
      {isOpen ? (
        <div className={style.line}>
          <h3>Aceptando nuevos pedidos</h3>
          <Button
            secondary
            loading={isLoading}
            onClick={() => handleClick(false)}
          >
            Cerrar pedidos
          </Button>
        </div>
      ) : (
        <div className={style.line}>
          <h3>No se aceptan nuevos pedidos</h3>
          <Button
            secondary
            loading={isLoading}
            onClick={() => handleClick(true)}
          >
            Abrir pedidos
          </Button>
        </div>
      )}
    </div>
  )
}
