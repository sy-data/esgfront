import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Checkbox,
  TableCell,
} from "@mui/material";
import TableHeader from "./TableHeader";
import TableRowData from "./TableRowData";
import { fetchParameterGroups, fetchParameterGroupDetails } from "./api";

const DataTable = ({
  data, // 테이블에 표시할 데이터
  selectedRows, // 선택된 행들의 배열
  allSelected, // 모든 행이 선택되었는지를 나타내는 불리언 값
  handleSelectAllRows, // 모든 행 선택을 처리하는 함수
  handleSelectRow, // 개별 행 선택을 처리하는 함수
  page, // 현재 페이지 번호
  rowsPerPage, // 페이지당 행의 수
  handleKeyDown, // 키다운 이벤트를 처리하는 함수
}) => {
  const [parameterData, setParameterData] = useState({});

  useEffect(() => {
    // 비동기로 매개변수 데이터를 가져오는 함수
    const fetchParameterData = async () => {
      // 임시로 설정된 사용자 ID
      const userId = 1;

      // 사용자 ID를 기반으로 매개변수 그룹을 가져옵니다.
      const groups = await fetchParameterGroups(userId);

      // 매개변수 그룹이 있는 경우
      if (groups.length > 0) {
        // 첫 번째 그룹의 세부 정보를 가져옵니다.
        const groupDetails = await fetchParameterGroupDetails(groups[0].id);

        // 매개변수 ID로 객체를 생성합니다.
        const parameterData = groupDetails.reduce((acc, item) => {
          acc[item.id] = item.parameter_id; // 각 아이템의 ID와 매개변수 ID를 매핑합니다.
          return acc;
        }, {});

        // 상태에 매개변수 데이터를 설정합니다.
        setParameterData(parameterData);
      }
    };

    // 데이터를 가져오는 함수를 호출합니다.
    fetchParameterData();
  }, []); // 빈 배열을 사용하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <TableContainer
      component={Paper} // Paper 컴포넌트를 사용하여 배경을 설정합니다.
      sx={{ maxHeight: 900, overflowX: "auto", maxWidth: 1200 }} // 스타일 속성을 사용하여 최대 높이와 너비를 설정합니다.
    >
      {/* 테이블을 생성하고 stickyHeader 속성을 사용하여 헤더를 고정합니다. */}
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                size="small"
                checked={allSelected} // 모든 행이 선택되었는지 여부에 따라 체크 여부를 결정합니다.
                onChange={handleSelectAllRows} // 체크박스의 상태 변경 시 호출되는 핸들러
                sx={{
                  display: "flex",
                  height: "50px",
                  borderBottom: "1px solid var(--Gray-e5e5e5, #E5E5E5)",
                  background: "var(--Gray-fff, #FFF)",
                }}
              />
            </TableCell>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRowData
              key={row.id} // 각 행의 고유 ID를 키로 사용합니다.
              row={row} // 현재 행의 데이터를 전달합니다.
              index={index} // 현재 행의 인덱스를 전달합니다.
              page={page} // 현재 페이지 번호를 전달합니다.
              rowsPerPage={rowsPerPage} // 페이지당 행의 수를 전달합니다.
              selectedRows={selectedRows} // 선택된 행들의 배열을 전달합니다.
              handleSelectRow={handleSelectRow} // 개별 행 선택을 처리하는 핸들러를 전달합니다.
              handleKeyDown={handleKeyDown} // 키다운 이벤트를 처리하는 핸들러를 전달합니다.
              parameterData={parameterData} // 매개변수 데이터를 전달합니다.
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// DataTable 컴포넌트를 내보냅니다.
export default DataTable;
