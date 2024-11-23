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
    setHeaderTitle("사업장관리");
    setTimeout(() => {
      // setWorkplaceList([]);
      // setSelectedWorkplace(1);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        <LeftArea flex={openRight.open?"1":"none"} width={openRight.open?"auto":"100%"} workplaceList={workplaceList} /*setSelectedWorkplace={setSelectedWorkplace} updateFields={updateFields}*/ loading={loading} />
        {openRight.open && <RightArea width={"529px"} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList} />}
      </Stack>
    </div>
  )
}

export default ManageWorkplace;
