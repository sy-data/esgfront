import React, { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import ProductGroups from "./ProductGroups";
import ProductList from "./ProductList";
import ProductRegister from "./ProductRegister";


const ManageProduct = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("생산품관리");
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
        {displayGroups && <ProductGroups />}
        <ProductList width={displayGroups?"75%":"66%"} register={handleRegister} />
        {!displayGroups && <ProductRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageProduct;
