import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatDistanceStrict } from 'date-fns'

import useOrders from '../../../hooks/useOrders'
import { getColorAlert } from '../../../helpers/getColorAlert'

export default function useOrderPage() {
  const navigate = useNavigate()
  const params = useParams()
  const { orders, setStartAlarm, updateOrder } = useOrders()

  const [order, setOrder] = useState(null)
  const [newOrder, setNewOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [timeDelivery, setTimeDelivery] = useState('')
  const [colorAlert, setColorAlert] = useState('')
  const [formCancel, setFormCancel] = useState(false)
  const [cancel, setCancel] = useState(null)
  const [timeAgo, setTimeAgo] = useState(null)

  useEffect(() => {
    const orderSelected = orders?.find((order) => order.id === params.id)
    setOrder(orderSelected)
  }, [orders, params.id])

  useEffect(() => {
    if (order?.deliveryIn) {
      setNewOrder({
        ...order,
        orderSend: true,
      })
    }
  }, [order])

  useEffect(() => {
    getColorAlert(setColorAlert, order)
  }, [order])

  useEffect(() => {
    if (order) {
      const timeAgo = formatDistanceStrict(new Date(), order?.createdAt, {
        unit: 'minute',
      })
      setTimeAgo(timeAgo)
    }
  }, [order])

  const handleChange = (e) => {
    setTimeDelivery(e.target.value)
    setNewOrder({
      ...order,
      deliveryIn: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await updateOrder(newOrder)
    setStartAlarm(false)
    setIsLoading(false)
    // TODO: enviar orden a impresora
    navigate('/')
  }

  const handleSubmitSend = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await updateOrder(newOrder)
    setIsLoading(false)
    navigate('/')
  }

  const handleCancelOrder = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await updateOrder({
      cancel,
      deliveryIn: 1,
      orderSend: true,
      ...order,
    })
    setStartAlarm(false)
    setIsLoading(false)
    navigate('/')
  }

  return {
    isLoading,
    formCancel,
    colorAlert,
    // printingLocal,
    order,
    timeDelivery,
    cancel,
    timeAgo,
    setFormCancel,
    setCancel,
    handleCancelOrder,
    handleChange,
    handleSubmit,
    handleSubmitSend,
  }
}
