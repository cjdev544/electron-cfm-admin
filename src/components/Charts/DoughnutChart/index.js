import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import style from './DoughnutChart.module.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({
  scores,
  legend,
  bgColor,
  borderColor,
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const data = {
      labels: legend,
      datasets: [
        {
          label: '# of Votes',
          data: scores,
          backgroundColor: bgColor,
          borderColor: borderColor,
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
