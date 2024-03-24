import React from 'react';
import {styled} from "@mui/material";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip, Legend} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
);

const ChartContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
}))

const TopStatus = () => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const data = {
        labels: ['공덕 센터', '마곡 센터', '상암 센터', '중앙 센터'],
        datasets: [
            {
                label: '목표 배출량',
                data: [100, 200, 300, 400],
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'stack 0',
            },
            {
                label: '실제 배출량',
                data: [100, 200, 300, 400],
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'stack 1',
            },
            {
                label: '배출량 차이',
                data: [100, 200, 300, 400],
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'stack 2',
            }
        ],
    };

    return (
        <ContentBody>
            <ChartContainer>
                <SubTitle title={"연단위 성과현황(사업장)"} />
                <div style={{width: '99%', flexGrow: 1}}>
                    <Bar
                        options={options}
                        data={data}
                    />
                </div>
            </ChartContainer>
        </ContentBody>
    );
}

export default TopStatus;
