import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const getIsOpenService = async () => {
  const docRef = doc(db, 'openClose', '8Wru5Z1vmVYRzzNbBOJA')
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export const updateOpenOrCloseService = async (isOpen) => {
  await updateDoc(doc(db, 'openClose', '8Wru5Z1vmVYRzzNbBOJA'), {
    isOpen,
  })
}
