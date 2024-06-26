import React, {useEffect, useState} from "react";
import {ContentWithTitie} from "../../../components/Styles";
import ParameterGroupList, {parameterGroupListDummy} from "./ParameterGroupList";
import ParameterGroupTableTitle from "./ParameterGroupTableTitle";
import {useGridApiRef} from "@mui/x-data-grid";

const dummyData = Array.from({length: 50}, (_, index) => {
    const randomGroup = parameterGroupListDummy[Math.floor(Math.random() * 12)];
    return {
        no: index + 1,
        id: index + 1,
        groupId: randomGroup.groupId,
        groupName: randomGroup.groupName,
        description: '1번 그룹'
    }
}).reverse();

/**
 * A_1_4. 파라미터 그룹 관리
 */
const ParameterGroupManagement = () => {
    const gridApiRef = useGridApiRef();

    const [data, setData] = useState(dummyData);
    const [selectedRow, setSelectedRow] = useState([]);
    // id 가 -1 이면 신규 행 추가
    const [editRowId, setEditRowId] = useState(null);

    // 수정할 행이 선택되면 기존에 체크되어있던 체크박스 해제
    useEffect(() => {
        if (editRowId !== null) {
            setSelectedRow([])
        }
    }, [editRowId])

    // 체크박스가 선택되면 수정하던 행 저장하고 수정모드 해제
    useEffect(() => {
        if (selectedRow.length > 0) {
            setEditRowId(null);
        }
    }, [selectedRow])

    return (
        <ContentWithTitie>
            <ParameterGroupTableTitle
                setData={setData}
                selectedRow={selectedRow}
                editRowId={editRowId}
                setEditRowId={setEditRowId}
            />
            <ParameterGroupList
                gridApiRef={gridApiRef}
                data={data}
                setData={setData}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
                editRowId={editRowId}
                setEditRowId={setEditRowId}
            />
        </ContentWithTitie>
    )
}

export default ParameterGroupManagement;
