import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth, db } from '../firebase/config.js'

const isUserAdmin = async (user) => {
  if (user) {
    const docRef = doc(db, 'admins', `${user?.uid}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  } else {
    return null
  }
}

export const checkUserServices = (setUser) => {
  onAuthStateChanged(auth, async (user) => {
    const isAdmin = await isUserAdmin(user)
    setUser(isAdmin)
  })
}

export const loginServices = (setIsLoading, handleErrors, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      isUserAdmin(userCredential.user)
    })
    .catch((err) => handleErrors(err))
    .finally(() => setIsLoading(false))
}

export const logoutServices = () => {
  signOut(auth).then(() => {})
}
