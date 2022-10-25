import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore'

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
