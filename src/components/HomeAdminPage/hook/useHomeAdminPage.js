import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import useProducts from '../../../hooks/useProducts'
import useHomePage from '../../../hooks/useHomePage'
import { rebuildClientApp } from '../../../helpers/rebuildClientApp'

export default function useHomeAdminPage() {
  const navigate = useNavigate()
  const [dataHomepage, setDataHomepage] = useState(null)
  const [dataSection, setDataSection] = useState(null)
  const [sectionTitle, setSectionTitle] = useState('')
  const [productsSelected, setProductsSelected] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [oldProductsSelected, setOldProductsSelected] = useState(null)

  const { products } = useProducts()
  const { dataHome, updateHomepage } = useHomePage()

  const optionProducts = products?.map((product) => ({
    key: product.id,
    text: product.nombre,
    value: product.id,
  }))

  useEffect(() => {
    setDataHomepage(dataHome)
  }, [dataHome])

  useEffect(() => {
    if (dataHomepage?.length) {
      const data = dataHomepage?.find(
        (section) => section.id === 'popularProducts'
      )
      setDataSection({ ...data, id: 'popularProducts' })
    }
  }, [dataHomepage])

  useEffect(() => {
    if (dataSection) {
      setSectionTitle(dataSection?.title)
      setProductsSelected(dataSection?.productsSection)
    }
  }, [dataSection])

  useEffect(() => {
    if (dataSection?.productsSection?.length) {
      const oldProducts = dataSection.productsSection.map((productId) => {
        const res = products.filter(
          (productOdGlobal) => productOdGlobal.id === productId
        )
        return res[0]
      })
      setOldProductsSelected(oldProducts)
    }
  }, [products, dataSection])

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    let dataForm

    if (!productsSelected?.length) {
      dataForm = {
        title: '',
        productsSection: [],
      }
      await updateHomepage(dataSection.id, dataForm)
      setIsLoading(false)
      rebuildClientApp('/')
      navigate('/settings')
    } else {
      if (!sectionTitle) {
        toast.warning('El título de la sección es obligatorio')
        return null
      }
      dataForm = {
        title: sectionTitle,
        productsSection: productsSelected,
      }
      await updateHomepage(dataSection.id, dataForm)
      setIsLoading(false)
      rebuildClientApp('/')
      navigate('/settings')
    }
  }

  return {
    isLoading,
    sectionTitle,
    oldProductsSelected,
    optionProducts,
    setSectionTitle,
    setProductsSelected,
    handleSubmit,
  }
}
