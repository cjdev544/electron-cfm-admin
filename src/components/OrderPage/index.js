import { round } from 'mathjs'
import { Button, Form } from 'semantic-ui-react'

import { printingLocal } from '../../helpers/printOrder'
import useOrderPage from './hook/useOrderPage'
import CancelForm from './components/CancelForm'
import DeliveryOrLocal from './components/DeliveryOrLocal'
import TimeDelivery from './components/TimeDelivery'
import style from './OrderPage.module.css'

export default function OrderPage() {
  const {
    isLoading,
    formCancel,
    colorAlert,
    order,
    timeDelivery,
    cancel,
    timeAgo,
    numberOrders,
    setFormCancel,
    setCancel,
    handleCancelOrder,
    handleChange,
    handleSubmit,
    handleSubmitSend,
  } = useOrderPage()

  if (!order) return null

  if (formCancel) {
    return (
      <CancelForm
        cancel={cancel}
        isLoading={isLoading}
        setCancel={setCancel}
        handleCancelOrder={handleCancelOrder}
      />
    )
  }
  console.log(order)
  return (
    <div className={style.order}>
      <div
        className={style.header}
        style={{ backgroundColor: `${colorAlert}` }}
      >
        <div className={style.buttons}>
          <Button onClick={() => printingLocal({ ...order, numberOrders })}>
            Imprimir
          </Button>
          {!order?.deliveryIn && !order?.cancel ? (
            <Button secondary onClick={() => setFormCancel(true)}>
              Cancelar orden
            </Button>
          ) : null}
        </div>

        <p>
          Realizado: <span>{timeAgo}</span>{' '}
        </p>
        <p>
          Pedido: <span>{order.id}</span>
        </p>
        <p>Número de compra: {numberOrders}</p>
      </div>
      {!order?.idPago ? (
        <div className={style.noPay}>
          <p>PEDIDO POR PAGAR</p>
          <p>Pagara: {order.cash}€</p>
          <p>Cambio: {round(Number(order.cash) - order.totalCompra, 2)}€</p>
        </div>
      ) : (
        <div className={style.noPay}>
          <p>PEDIDO YA PAGADO</p>
        </div>
      )}
      <div className={style.delivery}>
        <p>
          Fecha de entrega: <span>{order.fechaEntrega}</span>
        </p>
        <p>
          Hora de entrega: <span>{order.horaEntrega}</span>
        </p>
      </div>
      {order.direccionEnvio !== 'Recogida el en local' &&
        order.direccionEnvio !== 'Recogida en el local' && (
          <div className={style.delivery}>
            <p>
              Distancia: <span>{order?.direccionEnvio?.zone?.distance}Km</span>
            </p>
            <p>
              Tiempo aproximado de conducción:{' '}
              <span>{order?.direccionEnvio?.zone?.duration} Minutos</span>
            </p>
          </div>
        )}
      <div className={style.body}>
        {order.pedido.map((product) => (
          <div key={product.id} className={style.product}>
            <p>
              <span>
                {product.cantidadDelProducto} x {product.producto}
              </span>
            </p>
            <p>
              Percio unitario {product.precioUnitario}€ x{' '}
              {product.cantidadDelProducto} = {product.subTotal}€
            </p>
          </div>
        ))}
        <div className={style.costDelivery}>
          <p>
            <span>Total productos:</span>
          </p>
          <p>{order.sinDescuento}€</p>
        </div>
        {order?.descuento?.nombre && (
          <>
            <div className={style.costDelivery}>
              <p>
                <span>Cupon {order.descuento.nombre}:</span>
              </p>
              <p>{order.descuento.cost}%</p>
            </div>
            <div className={style.costDelivery}>
              <p>
                <span>Descuento aplicado:</span>
              </p>
              <p>{order.totalProductos}€</p>
            </div>
          </>
        )}
      </div>
      <p className={style.costDelivery}>Costo de envio: {order.costoEnvio}€</p>
      <div className={style.total}>
        {order?.idPago ? (
          <>
            <span>Pago N°: {order.idPago}</span>
            <p>Total pagado: {order.totalCompra}€</p>
          </>
        ) : (
          <p>Total por pagar: {order.totalCompra}€</p>
        )}
      </div>
      <div className={style.client}>
        <p className={style.titleClient}>Datos del pedido</p>
      </div>
      <DeliveryOrLocal order={order} />
      <div className={style.others}>
        {order.cubiertosParaPersonas === 0 ? (
          <p>No desea cubiertos</p>
        ) : (
          <p>
            <span>Cubiertos para:</span> {order.cubiertosParaPersonas}
          </p>
        )}
        {order.notas === '' ? (
          <p>No ha dejado ningúna nota</p>
        ) : (
          <p>
            <span>Notas:</span> {order.notas}
          </p>
        )}
      </div>
      {order?.deliveryIn === undefined && (
        <div className={style.formContainer}>
          <TimeDelivery
            timeDelivery={timeDelivery}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      {order?.deliveryIn !== undefined && order?.orderSend === undefined && (
        <div className={style.formContainer}>
          <Form className={style.resForm} onSubmit={handleSubmitSend}>
            <p>CONFIRMAR EL ENVIO DEL PEDIDO</p>
            <Button type='submit' primary>
              Pedido enviado
            </Button>
          </Form>
        </div>
      )}
    </div>
  )
}
