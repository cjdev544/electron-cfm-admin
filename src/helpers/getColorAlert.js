export const getColorAlert = (setColorAlert, order) => {
  if (order?.deliveryIn !== undefined) {
    if (order?.orderSend !== undefined) {
      setColorAlert('#1db954')
    } else {
      setColorAlert('#ffa500')
    }
  } else {
    setColorAlert('#f00')
  }
  if (order?.cancel) setColorAlert('#ccc')
}
