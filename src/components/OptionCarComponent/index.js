import CreateProduct from '../ProductsPage/components/CreateProduct'
import UpdateProduct from '../ProductsPage/components/UpdateProduct'
import DeleteProduct from '../ProductsPage/components/DeleteProduct'
import CreateCategory from '../CategoriesPage/components/CreateCategory'
import UpdateCategory from '../CategoriesPage/components/UpdateCategory'
import DeleteCategory from '../CategoriesPage/components/DeleteCategory'
import ChangeCostShipping from '../ShippingPage/components/ChangeCostShipping'
import StatisticsSell from '../StatisticsSell'
import StatisticsClients from '../StatisticsClients'
import StatisticsProducts from '../StatisticsProducts'
import style from './OptionCar.module.css'

export default function OptionCarComponent({ option, setComponent }) {
  const options = {
    'Crear producto': <CreateProduct />,
    'Cambiar producto': <UpdateProduct />,
    'Eliminar producto': <DeleteProduct />,
    'Crear categoría': <CreateCategory />,
    'Cambiar categoría': <UpdateCategory />,
    'Eliminar categoría': <DeleteCategory />,
    '0 a 2 km': <ChangeCostShipping title={'0 a 2km'} />,
    '2 a 6 km': <ChangeCostShipping title={'2 a 6km'} />,
    '6 a 10 km': <ChangeCostShipping title={'6 a 10km'} />,
    Ventas: <StatisticsSell />,
    Clientes: <StatisticsClients />,
    Productos: <StatisticsProducts />,
  }

  const handleClick = () => {
    setComponent(options[option])
  }

  return (
    <div className={style.car} onClick={handleClick}>
      <h3>{option}</h3>
    </div>
  )
}
