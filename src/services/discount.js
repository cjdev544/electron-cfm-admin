import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  query,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

import { db } from '../firebase/config'

export const createDiscountServices = (discountData, setIsLoading) => {
  const id = uuidv4()
  const docRef = doc(db, 'discount', id)
  setDoc(docRef, discountData)
    .then(() => toast.success('Cupon creado correctamente'))
    .catch((err) => {
      console.log(err)
      toast.error('Error al crear el cupon')
    })
    .finally(() => setIsLoading(false))
}

export const getDiscountsServices = async () => {
  const array = []
  const q = query(collection(db, 'discount'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}

export const deleteDiscountServices = async (discountId, setIsLoading) => {
  deleteDoc(doc(db, 'discount', discountId))
    .then(() => {
      toast.success('Cupon eliminado correctamente')
      if (setIsLoading) setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      toast.error('Error al eliminar el cupon')
      if (setIsLoading) setIsLoading(false)
    })
}
