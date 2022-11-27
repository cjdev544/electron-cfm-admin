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
        style: `text-align:center;`,
        css: { 'font-weight': '700', 'font-size': '18px' },
      },
      {
        type: 'text',
        value:
          'Teléfono: 649-71-88-31<br>Av Carlos Haya, con calle Francisco Rueda Perez 1, local 7<br>29007 Málaga, España<br><br>',
        style: `text-align:center;`,
        css: { 'font-size': '12px' },
      },
      {
        type: 'text',
        value: 'PEDIDO NO PAGADO',
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '18px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `Pagara: ${order.cash}€ <br> Cambio a devolver: ${round(
          Number(order.cash) - order.totalCompra,
          2
        )}€ <hr>`,
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          'padding-bottom': '10px',
        },
      },
      {
        type: 'text',
        value: `ENTREGA<br>${entrega}<br>${order.fechaEntrega} ${order.horaEntrega}`,
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `Orden N°: ${order.idPago}<hr>`,
        css: {
          'font-size': '12px',
          'font-family': 'sans-serif',
          padding: '10px 0',
          'text-align': 'left',
          'margin-left': '0',
        },
      },
      {
        type: 'text',
        value: 'PEDIDO POR PAGAR',
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'table',
        style: 'border: 1px solid #ddd',
        tableHeader: ['PEDIDO', 'COSTO'],
        tableBody: orders,
        // tableHeaderStyle: "background-color: #000; color: white;",
        tableHeaderStyle: 'font-size: 16px; font-weight: 700',
        tableBodyStyle:
          'border: 0.5px solid #ddd; font-size: 14px; font-weight: 700;',
      },
      {
        type: 'text',
        value: `<br>`,
      },
      {
        type: 'table',
        tableHeader: ['CALCULO TOTAL', ' '],
        style: 'border: 1px solid #ddd;',
        tableBody: totalCalculate,
        // tableHeaderStyle: "background-color: #000; color: white;",
        tableHeaderStyle: 'font-size: 16px; font-weight: 700',
        tableBodyStyle: 'border: 0.5px solid #ddd',
      },
      {
        type: 'text',
        value: 'DATOS DEL PEDIDO',
        style: `text-align:center;`,
        css: {
          margin: '10px 0',
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0 5px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `CUBIERTOS:    Para ${order?.cubiertosParaPersonas} personas<br>NOTAS:   ${order?.notas}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `NOMBRE: ${order?.name || order?.username}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `TELÉFONO: ${order?.phone}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `RECOGIDA EN EL LOCAL<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `ID usuario: ${order?.usuario}<br><hr>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `Número de compra: ${order?.numberOrders}<br><hr>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `${date} - ${hour}`,
        style: `text-align:center;`,
        css: { 'font-size': '12px', 'font-family': 'sans-serif' },
      },
    ]
  } else {
    data = [
      {
        type: 'text',
        value: 'CENTRAL FOOD<br>Málaga<br>',
        style: `text-align:center;`,
        css: { 'font-weight': '700', 'font-size': '18px' },
      },
      {
        type: 'text',
        value:
          'Teléfono: 649-71-88-31<br>Av Carlos Haya, con calle Francisco Rueda Perez 1, local 7<br>29007 Málaga, España<br><br>',
        style: `text-align:center;`,
        css: { 'font-size': '12px' },
      },
      {
        type: 'text',
        value: 'PEDIDO PAGADO',
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '18px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `ENTREGA<br>${entrega}<br>${order.fechaEntrega} ${order.horaEntrega}`,
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `Orden N°: ${order.idPago}<hr>`,
        css: {
          'font-size': '12px',
          'font-family': 'sans-serif',
          padding: '10px 0',
          'text-align': 'left',
          'margin-left': '0',
        },
      },
      {
        type: 'text',
        value: 'PEDIDO PAGADO',
        css: {
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'table',
        style: 'border: 1px solid #ddd',
        tableHeader: ['PEDIDO', 'COSTO'],
        tableBody: orders,
        // tableHeaderStyle: "background-color: #000; color: white;",
        tableHeaderStyle: 'font-size: 16px; font-weight: 700',
        tableBodyStyle:
          'border: 0.5px solid #ddd; font-size: 14px; font-weight: 700;',
      },
      {
        type: 'text',
        value: `<br>`,
      },
      {
        type: 'table',
        tableHeader: ['CALCULO TOTAL', ' '],
        style: 'border: 1px solid #ddd;',
        tableBody: totalCalculate,
        // tableHeaderStyle: "background-color: #000; color: white;",
        tableHeaderStyle: 'font-size: 16px; font-weight: 700',
        tableBodyStyle: 'border: 0.5px solid #ddd',
      },
      {
        type: 'text',
        value: 'DATOS DEL PEDIDO',
        style: `text-align:center;`,
        css: {
          margin: '10px 0',
          'background-color': '#000',
          color: '#000',
          'font-size': '12px',
          'font-family': 'sans-serif',
          'font-weight': '700',
          padding: '10px 0 5px 0',
          'text-align': 'center',
        },
      },
      {
        type: 'text',
        value: `CUBIERTOS:    Para ${order?.cubiertosParaPersonas} personas<br>NOTAS:   ${order?.notas}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `NOMBRE: ${order?.name || order?.username}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `TELÉFONO: ${order?.phone}<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `RECOGIDA EN EL LOCAL<br><br>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `ID usuario: ${order?.usuario}<br><hr>`,
        style: `text-align:left;`,
      },
      {
        type: 'text',
        value: `${date} - ${hour}`,
        style: `text-align:center;`,
        css: { 'font-size': '12px', 'font-family': 'sans-serif' },
      },
    ]
  }

  return data
}
