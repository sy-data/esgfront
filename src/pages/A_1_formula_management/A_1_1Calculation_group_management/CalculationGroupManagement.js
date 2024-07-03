import React, { useEffect, useState } from "react";
import { ContentWithTitie } from "../../../components/Styles";
import CalculationGroupManagementList, {
  parameterGroupListDummy,
} from "./CalculationGroupManagementList";
import CalculationGroupManagementTableTitle from "./CalculationGroupManagementTableTitle";
import { useGridApiRef } from "@mui/x-data-grid";

// 더미 데이터 생성
const dummyData = Array.from({ length: 50 }, (_, index) => {
  const randomGroup = parameterGroupListDummy[Math.floor(Math.random() * 12)];
  return {
    no: index + 1,
    id: index + 1,
    groupId: randomGroup.groupId,
    groupName: randomGroup.groupName,
    description: "1번 그룹",
  };
}).reverse();

const ParameterGroupManagement = () => {
  const gridApiRef = useGridApiRef(); // 그리드 API 참조 생성
  const [data, setData] = useState(dummyData); // 데이터 상태 관리
  const [selectedRow, setSelectedRow] = useState([]); // 선택된 행 상태 관리
  const [editRowId, setEditRowId] = useState(null); // 편집 중인 행 ID 상태 관리

  // 편집 모드가 설정되면 선택된 행을 초기화하는 효과
  useEffect(() => {
    if (editRowId !== null) {
      setSelectedRow([]);
    }
  }, [editRowId]);

  // 행이 선택되면 편집 모드를 해제하는 효과
  useEffect(() => {
    if (selectedRow.length > 0) {
      setEditRowId(null);
    }
  }, [selectedRow]);

  return (
    <ContentWithTitie>
      <CalculationGroupManagementTableTitle
        setData={setData}
        selectedRow={selectedRow}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
      />
      <CalculationGroupManagementList
        gridApiRef={gridApiRef}
        data={data}
        setData={setData}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        editRowId={editRowId}
        setEditRowId={setEditRowId}
      />
    </ContentWithTitie>
  );
};

export default ParameterGroupManagement;
