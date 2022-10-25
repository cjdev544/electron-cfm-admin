import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

import useRestaurants from '../../../../../hooks/useRestaurants'
import useProducts from '../../../../../hooks/useProducts'

export default function useForm(product) {
  const navigate = useNavigate()

  const { restaurants } = useRestaurants()
  const { products, setProducts, addNewProduct, updateProduct } = useProducts()

  const initialState = {
    restaurante: product?.restaurante || '',
    categoria: product?.categoria || '',
    nombre: product?.nombre || '',
    precio: product?.precio || '',
    descripcion: product?.descripcion || '',
    disponible: product?.disponible || true,
    path: product?.path || '',
    image: product?.image || '',
  }

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState(null)
  const [oldName, setOldName] = useState(null)
  const [formData, setFormData] = useState(initialState)
  const { restaurante, categoria, nombre, precio, descripcion, disponible } =
    formData

  useEffect(() => {
    if (product) {
      setFormData({ ...product })
      setImage(product?.image)
    }
  }, [product])

  useEffect(() => {
    setOldName(product?.nombre)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (restaurante) {
      const restaurantSelected = restaurants?.filter(
        (restaurant) => restaurant?.page === restaurante
      )
      const categoriesArray = restaurantSelected[0].categories
      setCategories(
        categoriesArray?.map((category) => ({
          key: category,
          value: category,
          text: category,
        }))
      )
    }
  }, [restaurante, restaurants])

  const allRestaurants = restaurants?.map((rest) => ({
    key: rest?.position,
    value: rest?.page,
    text: rest?.name,
  }))

  const handleRestaurantSelect = (e, option) => {
    setFormData({
      ...formData,
      restaurante: option.value,
    })
  }

  const handleCategorySelect = (e, option) => {
    setFormData({
      ...formData,
      categoria: option.value,
    })
  }

  const handlePathAndName = (e) => {
    let createPath = e.target.value.toLowerCase().replace(/ /g, '-')
    createPath = createPath.replace(/\(/g, '-')
    createPath = createPath.replace(/\)/g, '-')
    createPath = createPath.replace(/\//g, '-')
    createPath = createPath.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    setFormData({
      ...formData,
      nombre: e.target.value,
      path: createPath,
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRadio = (e, { checked }) => {
    setFormData({
      ...formData,
      disponible: checked,
    })
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setFile(file)
    setImage(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    let checkProductExist = products

    setIsLoading(true)

    if (!restaurante) {
      toast.error('Debes seleccionar un restaurante')
      setIsLoading(false)
      return null
    }
    checkProductExist = products.filter(
      (product) => product.restaurante === restaurante
    )

    if (!categoria) {
      toast.error('Debes seleccionar una categoría')
      setIsLoading(false)
      return null
    }

    if (!nombre) {
      toast.error('Debes introducir un nombre al plato')
      setIsLoading(false)
      return null
    }

    if (oldName) {
      if (nombre.toLowerCase() !== oldName.toLowerCase()) {
        checkProductExist = checkProductExist.filter(
          (product) => product.nombre.toLowerCase() === nombre.toLowerCase()
        )

        if (checkProductExist[0]) {
          toast.error(
            'El nombre del plato ya existe en el restaurante selecionado'
          )
          setIsLoading(false)
          return null
        }
      }
    }

    if (!oldName) {
      checkProductExist = checkProductExist.filter(
        (product) => product.nombre.toLowerCase() === nombre.toLowerCase()
      )

      if (checkProductExist?.length !== 0) {
        toast.error(
          'El nombre del plato ya existe en el restaurante selecionado'
        )
        setIsLoading(false)
        return null
      }
    }

    if (!precio) {
      toast.error('Debes introducir un precio al plato')
      setIsLoading(false)
      return null
    }
    if (!descripcion) {
      toast.error('Debes introducir una descripción al plato')
      setIsLoading(false)
      return null
    }
    if (!image && !file) {
      toast.error('Debes introducir una imágen al plato')
      setIsLoading(false)
      return null
    }

    if (!product) {
      const newProduct = addNewProduct(formData, file)
      setIsLoading(false)
      if (newProduct) setProducts([...products, newProduct])
      navigate('/settings')
    } else {
      const productUpdate = updateProduct(formData, file)
      if (productUpdate)
        setProducts(
          products?.map((product) =>
            product.id === productUpdate.id ? productUpdate : product
          )
        )
      navigate('/settings')
      setIsLoading(false)
    }
  }

  return {
    nombre,
    precio,
    image,
    descripcion,
    disponible,
    restaurante,
    categories,
    allRestaurants,
    isLoading,
    handleSubmit,
    handleRestaurantSelect,
    handleCategorySelect,
    handleRadio,
    handleChange,
    handlePathAndName,
    getRootProps,
    getInputProps,
  }
}
