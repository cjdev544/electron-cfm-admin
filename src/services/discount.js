import { doc, setDoc } from 'firebase/firestore'
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
