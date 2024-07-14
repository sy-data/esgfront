import React, { useEffect, useRef, useState } from "react";
import { ContentWithTitie } from "../../../components/Styles";
import CalculationGroupManagementList from "./CalcGroupList";
import CalculationGroupManagementTableTitle from "./CalcGroupTableTitle";
import { useGridApiRef } from "@mui/x-data-grid"; // 그리드 API 참조 훅을 불러옴
import { parameterGroupListDummy } from "./constants";
import { styled } from "@mui/material";

const NoDataMessage = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: theme.palette.text.secondary,
  fontSize: "18px",
  fontWeight: "bold",
  flexDirection: "row",
  "& svg": {
    marginTop: "11px",
    marginRight: "5px",
    width: "20px",
    height: "20px",
    marginBottom: "10px",
  },
}));

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
      {data.length === 0 ? (
        <NoDataMessage>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M11.1237 9.375C11.1237 9.20924 11.0579 9.05027 10.9407 8.93306C10.8235 8.81585 10.6645 8.75 10.4987 8.75C10.333 8.75 10.174 8.81585 10.0568 8.93306C9.9396 9.05027 9.87375 9.20924 9.87375 9.375V13.125C9.87375 13.2908 9.9396 13.4497 10.0568 13.5669C10.174 13.6842 10.333 13.75 10.4987 13.75C10.6645 13.75 10.8235 13.6842 10.9407 13.5669C11.0579 13.4497 11.1237 13.2908 11.1237 13.125V9.375ZM11.4362 6.875C11.4362 7.12347 11.3375 7.36177 11.1618 7.53747C10.9861 7.71317 10.7478 7.81187 10.4994 7.81187C10.2509 7.81187 10.0126 7.71317 9.8369 7.53747C9.66121 7.36177 9.5625 7.12347 9.5625 6.875C9.5625 6.62669 9.66114 6.38855 9.83672 6.21297C10.0123 6.03739 10.2504 5.93875 10.4987 5.93875C10.7471 5.93875 10.9852 6.03739 11.1608 6.21297C11.3364 6.38855 11.4362 6.62669 11.4362 6.875ZM10.5 1.25C8.17936 1.25 5.95376 2.17187 4.31282 3.81282C2.67187 5.45376 1.75 7.67936 1.75 10C1.75 12.3206 2.67187 14.5462 4.31282 16.1872C5.95376 17.8281 8.17936 18.75 10.5 18.75C12.8206 18.75 15.0462 17.8281 16.6872 16.1872C18.3281 14.5462 19.25 12.3206 19.25 10C19.25 7.67936 18.3281 5.45376 16.6872 3.81282C15.0462 2.17187 12.8206 1.25 10.5 1.25ZM3 10C3 9.01509 3.19399 8.03982 3.5709 7.12987C3.94781 6.21993 4.50026 5.39314 5.1967 4.6967C5.89314 4.00026 6.71993 3.44781 7.62987 3.0709C8.53982 2.69399 9.51509 2.5 10.5 2.5C11.4849 2.5 12.4602 2.69399 13.3701 3.0709C14.2801 3.44781 15.1069 4.00026 15.8033 4.6967C16.4997 5.39314 17.0522 6.21993 17.4291 7.12987C17.806 8.03982 18 9.01509 18 10C18 11.9891 17.2098 13.8968 15.8033 15.3033C14.3968 16.7098 12.4891 17.5 10.5 17.5C8.51088 17.5 6.60322 16.7098 5.1967 15.3033C3.79018 13.8968 3 11.9891 3 10Z"
              fill="#757575"
            />
          </svg>
          조회된 정보가 없습니다.
        </NoDataMessage>
      ) : (
        <CalculationGroupManagementList
          gridApiRef={gridApiRef} // 그리드 API 참조
          data={data} // 데이터
          setData={setData} // 데이터 설정 함수
          selectedRow={selectedRow} // 선택된 행
          setSelectedRow={setSelectedRow} // 선택된 행 설정 함수
          editRowId={editRowId} // 편집 중인 행 ID
          setEditRowId={setEditRowId} // 편집 중인 행 ID 설정 함수
        />
      )}
    </ContentWithTitie>
  );
};

export default ParameterGroupManagement;
