import { Button, Form } from 'semantic-ui-react'

import useShipping from './hook/useShipping'
import style from './ChangeCostShipping.module.css'

export default function ChangeCostShipping({ title }) {
  const {
    isLoading,
    newCost,
    costsShipping,
    selectionDistance,
    setNewCost,
    handleSubmit,
  } = useShipping(title)

  if (newCost === null) return null

  return (
    <div className={style.container}>
      <h2>{selectionDistance}</h2>

      <Form
        key={costsShipping?.id}
        className={style.form}
        onSubmit={handleSubmit}
      >
        <Form.Input
          placeholder='Costo por distancia'
          type='number'
          name='cost'
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
        />
        <Button type='submit' loading={isLoading}>
          Cambiar
        </Button>
      </Form>
    </div>
  )
}
