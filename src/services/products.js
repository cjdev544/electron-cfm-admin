import { v4 as uuidv4 } from 'uuid'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { toast } from 'react-toastify'

import { db, storage } from '../firebase/config'

const uploadImage = async (file, productId) => {
  const productsCollection = ref(storage, `products/${productId}`)
  const resultFile = await uploadBytes(productsCollection, file)
  return resultFile
}

const getImageURL = async (productId) => {
  const productRef = ref(storage, `products/${productId}`)
  const imageUrl = await getDownloadURL(productRef)
  return imageUrl
}

export const addNewProductServices = async (formData, file) => {
  const productId = uuidv4()
  const productRef = doc(db, 'products', productId)

  try {
    await uploadImage(file, productId)
    const imageUrl = await getImageURL(productId)
    const lowerName = formData.nombre.toLowerCase()

    await setDoc(productRef, {
      ...formData,
      nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
      image: imageUrl,
      id: productId,
    })
    toast.success('Producto creado correctamente')
    return {
      ...formData,
      nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
      image: imageUrl,
      id: productId,
    }
  } catch (err) {
    console.log(err)
    toast.error('Error al crear el producto')
    return null
  }
}

export const getAllProductsServices = async () => {
  const array = []
  const q = query(collection(db, 'products'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() })
  })
  return array
}

export const updateProductServices = async (product, file) => {
  const productRef = doc(db, 'products', product.id)
  try {
    const lowerName = product.nombre.toLowerCase()

    if (file) {
      await uploadImage(file, product.id)
      const imageUrl = await getImageURL(product.id)
      await updateDoc(productRef, {
        ...product,
        nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
        image: imageUrl,
      })
      toast.success('Producto cambiado correctamente')
      return {
        ...product,
        nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
        image: imageUrl,
      }
    } else {
      await updateDoc(productRef, {
        ...product,
        nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
      })
      toast.success('Producto cambiado correctamente')
      return {
        ...product,
        nombre: lowerName[0].toUpperCase() + lowerName.slice(1),
      }
    }
  } catch (err) {
    console.log(err)
    toast.error('Error al cambiar el producto')
    return null
  }
}

export const deleteProductServices = async (product) => {
  const productRef = ref(storage, `products/${product.id}`)
  try {
    await deleteObject(productRef)
    await deleteDoc(doc(db, 'products', product.id))
    toast.success('Producto eliminado correctamente')
    return product.id
  } catch (err) {
    console.log(err)
    toast.error('Error al eliminar el producto')
    return null
  }
}

export const updateCategoryInProductServices = async (product, newCategory) => {
  const productRef = doc(db, 'products', product.id)
  try {
    await updateDoc(productRef, { ...product, categoria: newCategory })
  } catch (err) {
    console.log(err)
    toast.error(
      `Error en el servidor! la categoria no fue cambiada correctamente en todos los productos`
    )
    return null
  }
}
