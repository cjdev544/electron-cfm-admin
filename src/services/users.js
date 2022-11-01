import { collection, getDocs, query } from 'firebase/firestore'

import { db } from '../firebase/config'

export const getAllUsersServices = async () => {
  const array = []
  const q = query(collection(db, 'users'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}
