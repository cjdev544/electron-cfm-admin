import style from './DeliveryOrLocal.module.css'

export default function DeliveryOrLocal({ order }) {
  return (
    <div className={style.dataClient}>
      <p>
        <span>Cliente:</span>
        {order.username} {order.usuario.lastname}
      </p>
      <p>
        <span>Nombre:</span> {order.name}
      </p>
      <p>
        <span>Teléfono:</span> {order.phone}
      </p>
      {order.direccionEnvio !== 'Recogida en el local' ? (
        <>
          <p>
            <span>Dirección:</span> {order.direccionEnvio.details},{' '}
            {order.direccionEnvio.zone.address}
          </p>
          <p>
            <span>Codigo postal:</span> {order.direccionEnvio.postalCode}
          </p>
        </>
      ) : (
        <p>
          <span>Dirección:</span> Recogida en el local
        </p>
      )}
    </div>
  )
}
