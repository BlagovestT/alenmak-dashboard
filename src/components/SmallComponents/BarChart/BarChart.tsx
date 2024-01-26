import { FinanceDateType } from "@/app/finance/page";
import { useTheme } from "@mui/material";
import { Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart as BarChartComponent } from "recharts";

interface BarChartProps {
    data: FinanceDateType[];
}

const BarChart: React.FC<BarChartProps> = ({data}) => {
    const theme = useTheme()
  return (
    <ResponsiveContainer width='100%' height={400}>
              <BarChartComponent
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey='earnings'
                  fill={theme.palette.primary.light}
                  name='Приход'
                />
                <Bar
                  dataKey='expenses'
                  fill={theme.palette.secondary.light}
                  name='Разход'
                />
              </BarChartComponent>
            </ResponsiveContainer>
  )
}

export default BarChart