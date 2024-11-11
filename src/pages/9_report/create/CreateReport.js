import React from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";
import Stack from "@mui/material/Stack";
import SelectGroupPlace from "./1-SelectGroupPlace";
import DataPeriod from "./2-DataPeriod";



const CreateReport = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("보고서 생성");
  }, []);

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", height: "100%", padding: "24px", boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: "16px"
    }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        <SelectGroupPlace />
        <DataPeriod />
      </Stack>
    </div>
  )
}

export default CreateReport;
