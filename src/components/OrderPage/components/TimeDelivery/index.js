import { Button, Form } from 'semantic-ui-react'

import style from './TimeDelivery.module.css'

export default function TimeDelivery({
  timeDelivery,
  handleChange,
  handleSubmit,
}) {
  return (
    <Form className={style.resForm} onSubmit={handleSubmit}>
      <p>MINUTOS APROXIMADOS PARA LA ENTREGA</p>
      <Form.Input
        type='number'
        placeholder='Tiempo en minutos para la entrega'
        value={timeDelivery}
        onChange={handleChange}
      />
      <Button
        type='submit'
        primary
        disabled={timeDelivery === '' || !timeDelivery ? true : false}
      >
        Confirmar pedido
      </Button>
    </Form>
  )
}
