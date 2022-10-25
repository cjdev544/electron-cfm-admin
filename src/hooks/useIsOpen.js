import { useEffect, useState } from 'react'

import {
  getIsOpenService,
  updateOpenOrCloseService,
} from '../services/isOpenOrClose'

export default function useIsOpen() {
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
    if (isOpen === null) {
      isOpenOrClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isOpenOrClose = async () => {
    const result = await getIsOpenService()
    setIsOpen(result.isOpen)
  }

  const updateOpenOrClose = (isOpen) => updateOpenOrCloseService(isOpen)

  return {
    isOpen,
    setIsOpen,
    updateOpenOrClose,
  }
}
