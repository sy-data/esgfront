import React, {useState} from "react";
import {ContentWithTitie} from "../../../components/Styles";
import ParameterGroupList from "./ParameterGroupList";
import ParameterGroupTableTitle from "./ParameterGroupTableTitle";
import {useGridApiRef} from "@mui/x-data-grid";

const dummyData = Array.from({ length: 50 }, (_, index) => ({
    no: index + 1,
    id: index + 1,
    groupId: '0001',
    groupName: '산정식 그룹1',
    description: '1번 그룹'
})).reverse();

const ParameterGroupManagement = () => {
    const gridApiRef = useGridApiRef();

    const [data, setData] = useState(dummyData);
    const [selectedRow, setSelectedRow] = useState([]);

    return (
        <ContentWithTitie>
            <ParameterGroupTableTitle setData={setData} selectedRow={selectedRow} />
            <ParameterGroupList gridApiRef={gridApiRef} data={data} setSelectedRow={setSelectedRow} />
        </ContentWithTitie>
    )
}

export default ParameterGroupManagement;
