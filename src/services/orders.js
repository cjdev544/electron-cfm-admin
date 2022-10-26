import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  query,
} from 'firebase/firestore'

import { db } from '../firebase/config'

export const listenOrdersTodayAndYesterdayServices = (
  setOrders,
  setStartAlarm
) => {
  onSnapshot(collection(db, 'orders'), (snap) => {
    const array = []
    snap.forEach((doc) => {
      const order = doc.data()
      if (!order?.deliveryIn && !order?.cancel) {
        setStartAlarm(true)
      }
      array.push(order)
    })
    setOrders(array.reverse())
  })
}

export const updateOrderServices = async (order) => {
  await updateDoc(doc(db, 'orders', `${order.id}`), {
    ...order,
  })
}

export const getAllOrdersServices = async () => {
  const array = []
  const q = query(collection(db, 'orders'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}
