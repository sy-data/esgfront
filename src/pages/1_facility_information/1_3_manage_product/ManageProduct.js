import React, { useState, useRef } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import Stack from "@mui/material/Stack";
import ProductGroups from "./ProductGroups";
import ProductList from "./ProductList";
import ProductRegister from "./ProductRegister";
import { esgFetch } from "../../../components/FetchWrapper";


const ManageProduct = () => {
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("생산품관리");
    updateGroupList();
  }, []);
  

  const [displayGroups, setDisplayGroups] = useState(true);
  const handleRegister = () => setDisplayGroups(false);
  const handleCloseRegister = () => setDisplayGroups(true);
  
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const updateGroupList = async () => {
    const result = await esgFetch("").then(res=>res.json());
    if(Array.isArray(result.data?.items)){
      setGroupList(result.data.items.map(group=>({
        id: group.id,
        type: group.type,
        name: group.name,
        count: group.count
      })));
      if(result.data.items.length>0)
        updateProductList(result.data.items[0].id);
    }
  }
  
  const [productList, setProductList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const updateProductList = async groupId => {
    setListLoading(true);
    // 기준년도 -> baseYearRef.current.baseYear;
    const result = await esgFetch("").then(res=>{
      setListLoading(false);
      return res.json();
    });
    if(Array.isArray(result.data?.items)){
      setProductList(result.data.items.map(f=>({
        id: f.id,
        product_name: f.product_name,
        hs_code: f.hs_code,
        unit: f.unit,
        ratio: f.ratio,
        bigo: f.bigo
      })));
    }
  }
  
  const refreshList = () => {
    updateProductList(groupList[selectedGroupIndex].id);
  }
  
  const baseYearRef = useRef();

  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        {displayGroups && <ProductGroups groupList={groupList} setGroupList={setGroupList} updateProductList={updateProductList} />}
        <ProductList baseYearRef={baseYearRef} width={displayGroups?"75%":"66%"} register={handleRegister} productList={productList} setProductList={setProductList} refreshList={refreshList} listLoading={listLoading} />
        {!displayGroups && <ProductRegister closeRegister={handleCloseRegister} />}
      </Stack>
    </div>
  )
}

export default ManageProduct;
