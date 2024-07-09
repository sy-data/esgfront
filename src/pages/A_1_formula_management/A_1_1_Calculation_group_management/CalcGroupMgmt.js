import React, { useEffect, useRef, useState } from "react";
import { ContentWithTitie } from "../../../components/Styles";
import CalculationGroupManagementList from "./CalcGroupList";
import CalculationGroupManagementTableTitle from "./CalcGroupTableTitle";
import { useGridApiRef } from "@mui/x-data-grid"; // 그리드 API 참조 훅을 불러옴
import { parameterGroupListDummy } from "./constants";

// 더미 데이터 생성
const dummyData = Array.from({ length: 50 }, (_, index) => {
  const randomGroup = parameterGroupListDummy[Math.floor(Math.random() * 12)]; // 랜덤으로 그룹을 선택
  return {
    no: index + 1, // 순번
    id: index + 1,
    groupId: randomGroup.groupId, // 그룹 ID
    groupName: randomGroup.groupName, // 그룹 이름
    description: "1번 그룹",
  };
}).reverse(); // 역순으로 정렬

const ParameterGroupManagement = () => {
  const gridApiRef = useGridApiRef(); // 그리드 API 참조 생성
  const [data, setData] = useState(dummyData); // 데이터 상태 관리
  const [selectedRow, setSelectedRow] = useState([]); // 선택된 행 상태 관리
  const [editRowId, setEditRowId] = useState(null); // 편집 중인 행 ID 상태 관리
  const customDataGridRef = useRef(null); // 커스텀 데이터 그리드 참조 생성

  // 편집 모드가 설정되면 선택된 행을 초기화하는 효과
  useEffect(() => {
    if (editRowId !== null) {
      setSelectedRow([]); // 편집 모드가 설정되면 선택된 행을 초기화
    }
  }, [editRowId]);

  // 행이 선택되면 편집 모드를 해제하는 효과
  useEffect(() => {
    if (selectedRow.length > 0) {
      setEditRowId(null); // 행이 선택되면 편집 모드를 해제
    }
  }, [selectedRow]);

  return (
    <ContentWithTitie>
      <CalculationGroupManagementTableTitle
        setData={setData} // 데이터 설정 함수
        selectedRow={selectedRow} // 선택된 행
        editRowId={editRowId} // 편집 중인 행 ID
        setEditRowId={setEditRowId} // 편집 중인 행 ID 설정 함수
        customDataGridRef={customDataGridRef} // 커스텀 데이터 그리드 참조
      />
      <CalculationGroupManagementList
        gridApiRef={gridApiRef} // 그리드 API 참조
        data={data} // 데이터
        setData={setData} // 데이터 설정 함수
        selectedRow={selectedRow} // 선택된 행
        setSelectedRow={setSelectedRow} // 선택된 행 설정 함수
        editRowId={editRowId} // 편집 중인 행 ID
        setEditRowId={setEditRowId} // 편집 중인 행 ID 설정 함수
      />
    </ContentWithTitie>
  );
};

export default ParameterGroupManagement;
