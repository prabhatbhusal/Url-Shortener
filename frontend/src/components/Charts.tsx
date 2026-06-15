import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import type { ChartProps } from '../@types/common.types'

const Charts = ({ analytics, alias }: ChartProps) => {
    return (
        <LineChart width={600} height={300} data={analytics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="clicks" allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line dataKey="clicks" />
        </LineChart>
    )
}

export default Charts