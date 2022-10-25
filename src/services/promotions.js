import { toast } from 'react-toastify'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/config'

export const getOfferForFirstBuyServices = async () => {
  const dataRef = doc(db, 'firstBuy', 'WjIbtKQdy2XADU8reeZB')
  try {
    const doc = await getDoc(dataRef)
    const costOfert = doc.data()
    return costOfert
  } catch (err) {
    console.log(err)
    toast.error(`Error en el servidor! el descuento no pudo ser encontrado`)
    return
  }
}

export const updateOfferForFirstBuyServices = async (newCostOfert) => {
  const dataRef = doc(db, 'firstBuy', 'WjIbtKQdy2XADU8reeZB')
  try {
    await updateDoc(dataRef, newCostOfert)
    toast.success('Los datos fueron actualizadados correctamente')
    return
  } catch (err) {
    console.log(err)
    toast.error(`Error en el servidor! los datos no fueron actualizadados`)
    return
  }
}
