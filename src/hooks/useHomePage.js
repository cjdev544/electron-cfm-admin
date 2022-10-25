import { useEffect, useState } from 'react'
import {
  getHomepageServices,
  updateHomepageServices,
} from '../services/homePage'

export default function useHomePage() {
  const [dataHome, setDataHome] = useState(null)

  useEffect(() => {
    getHomePage()
  }, [])

  const getHomePage = async () => {
    const dataHome = await getHomepageServices()
    setDataHome(dataHome)
  }

  const updateHomepage = async (sectionId, dataSection) => {
    await updateHomepageServices(sectionId, dataSection)
  }

  return {
    dataHome,
    updateHomepage,
  }
}
