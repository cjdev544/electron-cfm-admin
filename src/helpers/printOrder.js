import { orderInLocal } from './orderInLocal'
import { orderIsShipping } from './orderIsShipping'

const electron = window.require('electron')
const { ipcRenderer } = electron

export const printingLocal = (order) => {
  let data

  if (order.direccionEnvio !== 'Recogida en el local') {
    data = orderIsShipping(order)
  } else {
    data = orderInLocal(order)
  }

  ipcRenderer.send('print', JSON.stringify(data))
}
