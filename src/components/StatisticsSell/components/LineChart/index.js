import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import style from './LineChart.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options = {
  responsive: true,
}

export default function LineChart({ scores, labels, legend }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const data = {
      datasets: [
        {
          label: legend,
          data: scores,
          tension: 0.3,
          backgroundColor: '#1db954',
          borderColor: '#1db954',
          pointRadius: 6,
          pointBackgroundColor: '#1db954',
        },
      ],
      labels,
    }
    setData(data)
  }, [labels, scores, legend])

  if (!data) return <p>Cargando...</p>

  return (
    <div className={style.chart}>
      <Line data={data} options={options} />
    </div>
  )
}
