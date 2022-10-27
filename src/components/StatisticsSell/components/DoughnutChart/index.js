import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import style from './DoughnutChart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({ scores }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const data = {
      labels: ['% Pagos Tarjeta', '% Pagos efectivo'],
      datasets: [
        {
          label: '# of Votes',
          data: scores,
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    }
    setData(data)
  }, [scores])

  if (!data) return <p>Cargando...</p>

  return (
    <div className={style.chart}>
      <Doughnut data={data} options={{ responsive: true }} />
    </div>
  )
}
