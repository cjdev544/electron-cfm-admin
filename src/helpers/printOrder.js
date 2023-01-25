// implement in public/reload
import { orderInLocal } from './orderInLocal'
import { orderIsShipping } from './orderIsShipping'

const { electronAPI } = window

export const printingLocal = (order) => {
  let data
  console.log({ order })
  if (
    order.direccionEnvio !== 'Recogida el en local' &&
    order.direccionEnvio !== 'Recogida en el local'
  ) {
    data = orderIsShipping(order)
  } else {
    data = orderInLocal(order)
  }

  electronAPI.sendMessage('print', JSON.stringify(data))
}
