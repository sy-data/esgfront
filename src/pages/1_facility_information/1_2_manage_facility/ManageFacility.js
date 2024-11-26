import React, { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import FacilityGroups from "./FacilityGroups";
import FacilityList from "./FacilityList";
import FacilityRegister from "./FacilityRegister";
// import { SelectedYear, SelectedFactoryId } from "./States";


const ManageFacility = () => {
  // const resetSelectedYear = useResetRecoilState(SelectedYear);
  // const resetSelectedFacotyId = useSetRecoilState(SelectedFactoryId);

  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("시설정보관리");
    return () => {
      // resetSelectedYear();
      // resetSelectedFacotyId();
    };
  }, []);
  

  const [displayGroups, setDisplayGroups] = useState(true);
  const handleRegister = () => setDisplayGroups(false);
  const handleCloseRegister = () => setDisplayGroups(true);

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        {displayGroups && <FacilityGroups />}
        <FacilityList width={displayGroups?"75%":"66%"} register={handleRegister} />
        {!displayGroups && <FacilityRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageFacility;
