import React, { useEffect, useState } from "react";
import { ContentWithTitie } from "../../../components/Styles";
import CalculationGroupManagementList, {
  parameterGroupListDummy,
} from "./CalculationGroupManagementList";
import CalculationGroupManagementTableTitle from "./CalculationGroupManagementTableTitle";
import { useGridApiRef } from "@mui/x-data-grid";

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
  const gridApiRef = useGridApiRef();

  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState([]);

  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    if (editRowId !== null) {
      setSelectedRow([]);
    }
  }, [editRowId]);

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
