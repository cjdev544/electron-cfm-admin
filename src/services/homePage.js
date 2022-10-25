import { toast } from 'react-toastify'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'

import { db } from '../firebase/config'

export const getHomepageServices = async () => {
  const array = []
  const q = query(collection(db, 'homepage'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}

export const updateHomepageServices = async (sectionId, dataSection) => {
  const dataRef = doc(db, 'homepage', sectionId)
  try {
    await updateDoc(dataRef, dataSection)
    toast.success('La sección fue actualizada correctamente')
    return
  } catch (err) {
    console.log(err)
    toast.error(`Error en el servidor! la sección no pudo ser actualizada`)
    return
  }
}
