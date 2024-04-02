import React from "react";
import { styled } from "@mui/material";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const ChartContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));

const MiddleArea = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
  };

  const data = {
    labels: ["배출량"],
    datasets: [
      {
        data: [],
      },
    ],
  };

  return (
    <ContentBody>
      <ChartContainer>
        <SubTitle title={"| 제품 에너지 원단위"} />
        <div style={{ width: "99%", flexGrow: 1 }}>
          <Bar options={options} data={data} />
        </div>
      </ChartContainer>
    </ContentBody>
  );
};

export default MiddleArea;
