import React from 'react';
import {styled} from "@mui/material";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip} from "chart.js";

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

const TopStatus = () => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false
    };

    const data = {
        labels: ['테스트'],
        datasets: [{
            data: [],
        }],
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
