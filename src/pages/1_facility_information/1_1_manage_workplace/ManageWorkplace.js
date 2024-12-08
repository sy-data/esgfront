import { useState, useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { esgFetch } from "../../../components/FetchWrapper";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";
import { workplaceDetailAtom } from "./states";

import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import { Collapse } from "@mui/material";


const ManageWorkplace = () => {
  const [workplaceList, setWorkplaceList] = useState([]);
  // const [selectedWorkplace, setSelectedWorkplace] = useState();
  const [loading, setLoading] = useState(true);
  // const rightRef = useRef();
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);
  const openRight = useRecoilValue(workplaceDetailAtom);
  const setWorkplaceDetail = useSetRecoilState(workplaceDetailAtom);
  
  // const updateFields = values => rightRef.current.updateFields(values);
  
  useEffect(() => {
    // esgFetch('/api/factories?filters[company][id][$eq]=1&populate[]=company.industry')
    //   .then(response => response.json())
    //   .then(response => {
    //     setWorkplaceList(response.data.map((v, i) => ({
    //       index: i + 1,
    //       id: v.id,
    //       name: v.attributes.name,
    //       number: v.attributes.brn,
    //       industry: v.attributes.company.data.attributes.industry.data.id,
    //       attributes: v.attributes
    //     })));
    //     setLoading(false);
    //   });
    setLoading(true);
    refreshList()
    setHeaderTitle("사업장관리");
  }, []);
  
  const refreshList = async () => {
    const bn = "12345678";
    const result = await esgFetch(`/registration/company/${bn}`)
      .then(res=>{
        setLoading(false);
        return res.json();
      });
    
    if(Array.isArray(result.data?.items)){
      setRows(result.data.items.map(m=>({
        id: m.id || '',
        type: m.type || '',
        company_branch: m.company_branch || '',
        company_name: m.title || '',
        company_use: m.company_use || '',
        company_number1: m.bn.substring(0,3),
        company_number2: m.bn.substring(3,5),
        company_number3: m.bn.substring(5),
        workplace_name: m.workplace_name || '',
        phone_number1: m.rep_tel_destination_code || '',
        phone_number2: m.rep_tel_number.substring(0,4),
        phone_number3: m.rep_tel_number.substring(4,8),
        industry_type: m.industry_type || '',
        company_size: m.company_type,
        employee_number: m.employee_number || '',
        address1: m.zip_code || '',
        address2: m.addr || '',
        address3: m.addr_detail || '',
        sales_last: m.sales_last || '',
        sales_now: m.sales_now || '',
        area_j: m.area_j || '',
        area_y: m.area_y || '',
        register_date: m.register_date || null,
        close_date: m.close_date || null,
        product_yn: m.product_yn || ''
      })));
    }
  }
  
  const [rows, setRows] = useState([
    // {
    //   id: '1',
    //   type: '본사',
    //   company_branch: "",
    //   company_name: "경기 정밀 산업",
    //   company_number: "123-45-67890",
    //   company_use: true,
    //   company_size: "대기업",
    //   industry_type: "제조업/건설업",
    //   register_date: "1111-11-11",
    //   product_yn: "n"
    // },
  ]);
  
  const handleSelectRow = rowId => {
    if(rowId === null){
      setWorkplaceDetail({
        open: true,
        id: '',
        type: '',
        company_branch: '',
        company_name: '',
        company_use: '',
        company_number1: '',
        company_number2: '',
        company_number3: '',
        workplace_name: '',
        phone_number1: '',
        phone_number2: '',
        phone_number3: '',
        industry_type: '',
        company_size: '',
        employee_number: '',
        address1: '',
        address2: '',
        address3: '',
        sales_last: '',
        sales_now: '',
        area_j: '',
        area_y: '',
        register_date: null,
        close_date: null,
        product_yn: ''
      })
    }
    else{
      const selectedRow = typeof rowId === "string" ? rows.filter(f=>f.id===rowId)[0] : rows.filter(f=>f.id===rowId[0])[0]
      
      if(selectedRow && Object.keys(selectedRow).length > 0){
        setWorkplaceDetail({
          open: true,
          id: selectedRow.id || "",
          type: selectedRow.type || "",
          company_branch: selectedRow.company_branch || "",
          company_name: selectedRow.company_name || "",
          company_use: selectedRow.company_use || "",
          company_number1: selectedRow.company_number1 || "",
          company_number2: selectedRow.company_number2 || "",
          company_number3: selectedRow.company_number3 || "",
          workplace_name: selectedRow.workplace_name || "",
          phone_number1: selectedRow.phone_number1 || "",
          phone_number2: selectedRow.phone_number2 || "",
          phone_number3: selectedRow.phone_number3 || "",
          industry_type: selectedRow.industry_type || "",
          company_size: selectedRow.company_size || "",
          employee_number: selectedRow.employee_number || "",
          address1: selectedRow.address1 || "",
          address2: selectedRow.address2 || "",
          address3: selectedRow.address3 || "",
          sales_last: selectedRow.sales_last || "",
          sales_now: selectedRow.sales_now || "",
          area_j: selectedRow.area_j || "",
          area_y: selectedRow.area_y || "",
          register_date: selectedRow.register_date || null,
          close_date: selectedRow.close_date || null,
          product_yn: selectedRow.product_yn || ""
        });
      }
    }
  }
  
  
  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        <LeftArea rows={rows} handleSelectRow={handleSelectRow} setRows={setRows} refreshList={refreshList} flex={openRight.open?"1":"none"} width={openRight.open?"auto":"100%"} workplaceList={workplaceList} /*setSelectedWorkplace={setSelectedWorkplace} updateFields={updateFields}*/ loading={loading} />
        {openRight.open && <RightArea handleSelectRow={handleSelectRow} width={"529px"} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList} refreshList={refreshList} />}
      </Stack>
    </div>
  )
}

export default ManageWorkplace;
