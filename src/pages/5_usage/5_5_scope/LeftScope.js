import { styled } from "@mui/material"
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ChartContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%'
}))

const FuelData = facilities => {
  const rawData = {}

  facilities?.length > 0 && facilities.forEach(facility => {
    facility.combustions.length > 0 && facility.combustions.forEach(combustion => {
      if ("id" in combustion.fuel) {
        if (combustion.fuel.id in rawData) {
          rawData[combustion.fuel.id].amount = rawData[combustion.fuel.id].amount + Math.floor(Math.random() * 100);
        }
        else {
          rawData[combustion.fuel.id] = { name: combustion.fuel.name, amount: Math.floor(Math.random() * 100) };
        }
      }
    });
  });
  const keys = Object.keys(rawData);
  return {
    labels: keys.map(id => rawData[id].name),
    datasets: [
      {
        data: keys.map(id => rawData[id].amount),
        backgroundColor: Array.from({ length: keys.length }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`),
      }
    ]
  };
}

const LeftScope = props => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        enabled: false
      },

    }
  };

  const plugins = [
    {
      id: 'display_tooltip',
      afterDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y } = datapoint.tooltipPosition();

            const text = `${chart.data.labels[index]} ${chart.data.datasets[i].data[index]}`;
            const textWidth = ctx.measureText(text).width;
            ctx.font = '0.9rem Roboto';
            ctx.fillStyle = 'black';
            ctx.fillText(text, x - (textWidth / 2), y);
            ctx.restore();
          })
        })
      }
    }
  ]

  const chartForm = data => {
    const keys = Object.keys(data);
    return {
      labels: keys.map(id => data[id].name),
      datasets: [
        {
          data: keys.map(id => data[id].amount),
          backgroundColor: Array.from({ length: keys.length }, () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.4)`),
        }
      ]
    }
  }
  const data = props.baseData ? chartForm(props.baseData) : { labels: [], datasets: [] };

  return (
    <ContentBody>
      <ChartContainer>
        <SubTitle title={"에너지 사용량(TJ)"} />
        <div style={{ width: '99%', flexGrow: 1 }}>
          <Doughnut
            options={options}
            data={data}
            plugins={plugins}
          />
        </div>
      </ChartContainer>
    </ContentBody>
  )
}

export default LeftScope;
