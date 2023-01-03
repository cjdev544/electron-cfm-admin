import { format } from 'date-fns'
import { round } from 'mathjs'

export const orderInLocal = (order) => {
  const date = format(order.createdAt, 'dd/MM/yy')
  const hour = format(order.createdAt, 'h:mm aaa')

  let entrega = ''
  let totalMinusIVA
  let totalWhitIVA

  if (order?.horaEntrega !== 'Lo antes posible') {
    entrega = 'PROGRAMADA'
  }

  const orders = order.pedido.map((oneOrder) => {
    const product = `${oneOrder.cantidadDelProducto} x ${oneOrder.producto}`
    const priceMinusIVA = round(
      oneOrder.subTotal - (oneOrder.subTotal * 10) / 100,
      2
    )
    return [product, `${priceMinusIVA}€`]
  })

  if (order?.sinDescuento) {
    totalMinusIVA = round(
      order.sinDescuento - (order.sinDescuento * 10) / 100,
      2
    )
    totalWhitIVA = order?.sinDescuento
  } else {
    totalMinusIVA = round(
      order.totalProductos - (order.totalProductos * 10) / 100,
      2
    )
    totalWhitIVA = order.totalProductos
  }

  const minusIVA = ['Productos', `${totalMinusIVA}€`]
  const totalPlusIVA = ['IVA 10%', `${totalWhitIVA}€`]
  const shipping = ['Costo envío', `${order?.costoEnvio}€`]
  const discount = [
    `Descuento ${order?.descuento?.cost || 0}%`,
    `${order?.totalProductos}€`,
  ]
  const totalPrice = round(order?.totalProductos + order?.costoEnvio, 2)
  const total = ['Total a pagar', `${totalPrice}€`]
  const totalCalculate = [minusIVA, totalPlusIVA, discount, shipping, total]

  let data
  if (!order?.idPago) {
    data = [
      {
        type: 'text',
        value: 'CENTRAL FOOD<br>Málaga<br>',
        style: { fontWeight: '700', textAlign: 'center', fontSize: '18px' },
      },
      {
        type: 'text',
        value:
          'Teléfono: 649-71-88-31<br>Av Carlos Haya, con calle Francisco Rueda Perez 1, local 7<br>29007 Málaga, España<br><br>',
        style: { textAlign: 'center', fontSize: '12px' },
      },
      {
        type: 'text',
        value: 'PEDIDO NO PAGADO',
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontFamily: 'sans-serif',
          padding: '10px 0',
          fontWeight: '700',
          textAlign: 'center',
          fontSize: '18px',
        },
      },
      {
        type: 'text',
        value: `Pagara: ${order.cash}€ <br> Cambio a devolver: ${round(
          Number(order.cash) - order.totalCompra,
          2
        )}€ <hr>`,
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontFamily: 'sans-serif',
          paddingBottom: '10px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      {
        type: 'text',
        value: `ENTREGA<br>${entrega}<br>${order.fechaEntrega} ${order.horaEntrega}`,
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontFamily: 'sans-serif',
          padding: '10px 0',
          fontWeight: '700',
          textAlign: 'center',
          fontSize: '12px',
        },
      },
      {
        type: 'text',
        value: `Orden N°: ${order.idPago}<hr>`,
        style: {
          fontFamily: 'sans-serif',
          padding: '10px 0',
          textAlign: 'left',
          marginLeft: '0',
          fontSize: '12px',
        },
      },
      {
        type: 'table',
        // style the table
        style: { border: '1px solid #ddd' },
        // list of the columns to be rendered in the table header
        tableHeader: ['PEDIDO', 'COSTO'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: orders,
        // list of columns to be rendered in the table footer
        tableFooter: ['', ''],
        // custom style for the table header
        tableHeaderStyle: {
          backgroundColor: '#000',
          color: 'white',
          fontSize: '16px',
        },
        // custom style for the table body
        tableBodyStyle: {
          border: '0.5px solid #ddd',
          fontSize: '14px',
          fontWeight: '700',
        },
        // custom style for the table footer
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
      },
      {
        type: 'table',
        tableHeader: ['CALCULO TOTAL', ' '],
        style: { border: '1px solid #ddd' },
        tableBody: totalCalculate,
        tableFooter: ['', ''],
        tableHeaderStyle: { fontSize: '16px', fontWeight: '700' },
        tableBodyStyle: { border: '0.5px solid #ddd' },
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
      },
      {
        type: 'text',
        value: 'DATOS DEL PEDIDO',
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontFamily: 'sans-serif',
          fontWeight: '700',
          padding: '10px 0 5px 0',
          textAlign: 'center',
          margin: '10px 0',
          fontSize: '12px',
        },
      },
      {
        type: 'text',
        value: `CUBIERTOS:    Para ${order?.cubiertosParaPersonas} personas<br>NOTAS:   ${order?.notas}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `NOMBRE: ${order?.name || order?.username}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `TELÉFONO: ${order?.phone}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `RECOGIDA EN EL LOCAL<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `ID usuario: ${order?.usuario}<br><hr>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `Número de compra: ${order?.numberOrders}<br><hr>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `${date} - ${hour}`,
        style: {
          textAlign: 'center',
          fontSize: '12px',
          fontFamily: 'sans-serif',
        },
      },
    ]
  } else {
    data = [
      {
        type: 'text',
        value: 'CENTRAL FOOD<br>Málaga<br>',
        style: { fontWeight: '700', fontSize: '18px', textAlign: 'center' },
      },
      {
        type: 'text',
        value:
          'Teléfono: 649-71-88-31<br>Av Carlos Haya, con calle Francisco Rueda Perez 1, local 7<br>29007 Málaga, España<br><br>',
        style: { fontSize: '12px', textAlign: 'center' },
      },
      {
        type: 'text',
        value: 'PEDIDO PAGADO',
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontSize: '18px',
          fontFamily: 'sans-serif',
          fontWeight: '700',
          padding: '10px 0',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        value: `ENTREGA<br>${entrega}<br>${order.fechaEntrega} ${order.horaEntrega}`,
        style: {
          backgroundColor: '#000',
          color: '#000',
          fontSize: '12px',
          fontFamily: 'sans-serif',
          fontWeight: '700',
          padding: '10px 0',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        value: `Orden N°: ${order.idPago}<hr>`,
        style: {
          fontSize: '12px',
          fontFamily: 'sans-serif',
          padding: '10px 0',
          textAlign: 'left',
          marginLeft: '0',
        },
      },
      {
        type: 'table',
        // style the table
        style: { border: '1px solid #ddd' },
        // list of the columns to be rendered in the table header
        tableHeader: ['PEDIDO', 'COSTO'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: orders,
        // list of columns to be rendered in the table footer
        tableFooter: ['', ''],
        // custom style for the table header
        tableHeaderStyle: {
          backgroundColor: '#000',
          color: 'white',
          fontSize: '16px',
        },
        // custom style for the table body
        tableBodyStyle: {
          border: '0.5px solid #ddd',
          fontSize: '14px',
          fontWeight: '700',
        },
        // custom style for the table footer
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
      },
      {
        type: 'table',
        tableHeader: ['CALCULO TOTAL', ' '],
        style: { border: '1px solid #ddd' },
        tableBody: totalCalculate,
        tableFooter: ['', ''],
        tableHeaderStyle: { fontSize: '16px', fontWeight: '700' },
        tableBodyStyle: { border: '0.5px solid #ddd' },
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
      },
      {
        type: 'text',
        value: 'DATOS DEL PEDIDO',
        style: {
          margin: '10px 0',
          backgroundColor: '#000',
          color: '#000',
          fontSize: '12px',
          fontFamily: 'sans-serif',
          fontWeight: '700',
          padding: '10px 0 5px 0',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        value: `CUBIERTOS:    Para ${order?.cubiertosParaPersonas} personas<br>NOTAS:   ${order?.notas}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `NOMBRE: ${order?.name || order?.username}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `TELÉFONO: ${order?.phone}<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `RECOGIDA EN EL LOCAL<br><br>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `ID usuario: ${order?.usuario}<br><hr>`,
        style: { textAlign: 'left' },
      },
      {
        type: 'text',
        value: `${date} - ${hour}`,
        style: {
          fontSize: '12px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
        },
      },
    ]
  }

  return data
}
