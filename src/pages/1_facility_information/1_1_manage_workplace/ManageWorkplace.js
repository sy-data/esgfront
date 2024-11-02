import { useState, useRef, useEffect } from "react";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Stack from "@mui/material/Stack";
import { ContentWithTitie } from "../../../components/Styles";
import SplitArea from "../../../components/SplitArea";
import MenuTitle from "../../../components/MenuTitle";
import { esgFetch } from "../../../components/FetchWrapper";
import { useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import LeftArea from "./LeftArea";
import RightArea from "./RightArea";


const ManageWorkplace = () => {
  const [workplaceList, setWorkplaceList] = useState([]);
  const [selectedWorkplace, setSelectedWorkplace] = useState();
  const [loading, setLoading] = useState(true);
  const rightRef = useRef();
  const setHeaderTitle = useSetRecoilState(headerTitleAtom);
  
  const updateFields = values => rightRef.current.updateFields(values);
  
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
      setWorkplaceList([]);
      setSelectedWorkplace(1);
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div style={{ backgroundColor: "#eaeaea", width: "calc(100% - 236px)", padding: "24px", boxSizing: "border-box" }}>
      <Stack direction="row" spacing={3} height={"100%"} width={"100%"}>
        <LeftArea flex={selectedWorkplace?"1":"none"} width={selectedWorkplace?"auto":"100%"} workplaceList={workplaceList} setSelectedWorkplace={setSelectedWorkplace} /*updateFields={updateFields}*/ loading={loading} />
        {selectedWorkplace && <RightArea width={"529px"} selectedWorkplace={selectedWorkplace} setSelectedWorkplace={setSelectedWorkplace} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList} ref={rightRef} />}
      </Stack>
    </div>
  )
}

export default ManageWorkplace;
