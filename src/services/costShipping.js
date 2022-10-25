import { toast } from 'react-toastify'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/config'

export const getAllCostsShippingServices = async () => {
  const array = []
  const q = query(collection(db, 'shipping'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}

export const updateCostShippingServices = async (
  shippingId,
  newCostAndDistance
) => {
  const shippingRef = doc(db, 'shipping', shippingId)
  try {
    await updateDoc(shippingRef, newCostAndDistance)
    toast.success('Los datos fueron actualizadados correctamente')
    return
  } catch (err) {
    console.log(err)
    toast.error(`Error en el servidor! los datos no fueron actualizadados`)
    return
  }
}
