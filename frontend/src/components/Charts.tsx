import type { ChartProps } from '../@types/common.types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Line } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options={
    responsive:true,
    plugins:{
        legend:{
            position:'top' as const,
        },
        title:{
            display:true,
            text:'Url Shortener Analytics Chart'
        }
    }
}




const Charts = ({analytics,alias}:ChartProps) => {
    const labels=analytics.map(item => item.date_click__date);
const data=analytics.map(item=>item.clicks)
    return (
        <>
        <Line options={options}
    data={{
        labels: labels,
        datasets: [{
            label: `Clicks for ${alias}`,
            data: data,
            borderColor: 'rgb(75, 192, 192)',
        }]
    }}
/>
        </>
    )
}
export default Charts