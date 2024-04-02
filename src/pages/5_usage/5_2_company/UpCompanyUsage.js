import { styled } from "@mui/material"
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

const ChartContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}))

const UpCompanyUsage = props => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false
  };

  const labels = (props.data && props.data.length > 0) ? props.data.map(m=>m.name) : [];

  const data = {
    labels: labels,
    datasets: [{
      // TODO : 배출량 계산방법 확인
      data: props.data?.map(m=>m.id*100)
    }],
  };

  return (
    <ContentBody>
      <ChartContainer>
        <SubTitle title={"에너지 사용량"} />
        <div style={{width: '99%', flexGrow: 1}}>
          <Bar
            options={options}
            data={data}
          />
        </div>
      </ChartContainer>
    </ContentBody>
  )
}

export default UpCompanyUsage;
