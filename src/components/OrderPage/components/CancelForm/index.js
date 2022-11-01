import { Button, Form } from 'semantic-ui-react'

import style from './CancelForm.module.css'

export default function CancelForm({
  cancel,
  isLoading,
  setCancel,
  handleCancelOrder,
}) {
  return (
    <Form className={style.resForm} onSubmit={handleCancelOrder}>
      <p>MOTIVO DE LA CANCELACIÓN DEL PEDIDO</p>
      <Form.TextArea
        placeholder='Mensaje que vera el cliente'
        onChange={(e) => setCancel(e.target.value)}
      />
      <Button
        type='submit'
        primary
        disabled={isLoading || cancel === ''}
        loading={isLoading}
      >
        Cancelar pedido
      </Button>
    </Form>
  )
}
