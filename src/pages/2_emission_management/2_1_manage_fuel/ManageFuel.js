import React, { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import FuelGroups from "./FuelGroups";
import FuelInformation from "./FuelInformation";
import ExternalFuelRegister from "./ExternalFuelRegister";


const ManageFuel = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("배출연료관리");
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
        {displayGroups && <FuelGroups />}
        <FuelInformation width={displayGroups?"75%":"66%"} register={handleRegister} closeRegister={handleCloseRegister} />
        {!displayGroups && <ExternalFuelRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageFuel;
