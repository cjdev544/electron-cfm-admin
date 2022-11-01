import style from './DeliveryOrLocal.module.css'

export default function DeliveryOrLocal({ order }) {
  return (
    <>
      {order.direccionEnvio !== 'Recogida en el local' ? (
        <div className={style.dataClient}>
          <p>
            <span>Cliente:</span>
            {order.username} {order.usuario.lastname}
          </p>
          <p>
            <span>Nombre:</span> {order.direccionEnvio.name}
          </p>
          <p>
            <span>Teléfono:</span> {order.direccionEnvio.phone}
          </p>
          <p>
            <span>Dirección:</span> {order.direccionEnvio.details},{' '}
            {order.direccionEnvio.zone.address}
          </p>
          <p>
            <span>Codigo postal:</span> {order.direccionEnvio.postalCode}
          </p>
        </div>
      ) : (
        <div className={style.dataClient}>
          <div>
            <p>
              <span>Cliente:</span>
              {order.username
                ? order.username
                : `${order.usuario.name} ${order.usuario.lastname}`}
            </p>
            <p>
              <span>Quien recibe:</span> {order.name}
            </p>
            <p>
              <span>Teléfono:</span> {order.phone}
            </p>
          </div>
          <p>
            <span>Dirección:</span> Recogida en el local
          </p>
        </div>
      )}
    </>
  )
}
