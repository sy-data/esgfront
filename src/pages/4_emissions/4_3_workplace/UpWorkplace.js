import { styled } from "@mui/material"
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
);

const ChartContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}))

const UpWorkplace = props => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false
  };
  
  const data = props.chartData ? {
    labels: props.chartLabel,
    datasets: props.chartData
  } : {
    labels: [],
    datasets: []
  }

  return (
    <ContentBody>
      <ChartContainer>
        <SubTitle title={"법인별 배출량"} />
        <div style={{ width: '99%', flexGrow: 1 }}>
          <Bar
            options={options}
            data={data}
          />
        </div>
      </ChartContainer>
    </ContentBody>
  )
}

export default UpWorkplace;
