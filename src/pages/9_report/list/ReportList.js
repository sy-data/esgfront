import React, {useRef, useState, useMemo} from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleAtom } from "../../../States/header/Title";

import { Button, Select, MenuItem, Typography, SvgIcon } from "@mui/material";
import BaseYearSelect from "../../../components/filters/BaseYearSelect";
import ContentBody from "../../../components/ContentBody";
import SubTitle from "../../../components/SubTitle";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useNavigate } from "react-router-dom";
import { ReactComponent as CalendarIcon } from "./IconCalendar.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const ReportList = () => {
  const baseYearRef = useRef(null);
  const navigate = useNavigate();

  const setHeaderTitle = useSetRecoilState(headerTitleAtom);

  React.useEffect(() => {
    setHeaderTitle("보고서");
    // return () => {
    //   resetSelectedYear();
    //   resetSelectedFacotyId();
    // };
  }, []);
  
  const [open, setOpen] = useState(false);
  const handleOpenPicker = () => {
    setOpen(true);
  };
  const HeaderDatePicker = props => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
      props.onDateChange(newDate);
      setOpen(false);
    };

    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            open={open}
            onClose={() => setOpen(false)}
            value={selectedDate}
            onChange={handleDateChange}
            defaultValue={dayjs("2024-12-31")}
            renderInput={() => null}
          />
        </LocalizationProvider>
      </>
    );
  }
  
  const columns = useMemo(() => [
    { field: 'name', headerName: '보고서명' },
    { field: 'group_name', headerName: '조직명', width: 300 },
    { field: 'workplace_name', headerName: '사업장명', width: 330 },
    { field: 'target_date', headerName: '적용기간', width: 330 },
    { field: 'create_date', headerName: '생성일', width: 330, renderHeader: () => (
      <div style={{display:"flex", alignItems:"center", gap: "10px"}} onClick={event=>event.stopPropagation()}>
        <div style={{display:"flex", alignItems:"center", height: "24px"}}>생성일</div>
        <div style={{display:"flex", alignItems:"center", width: "24px", height: "24px", cursor: "pointer"}}>
          <SvgIcon viewBox="0 0 20 20" component={CalendarIcon} onClick={handleOpenPicker} />
          <HeaderDatePicker onDateChange={date=>console.log(date)} />
        </div>
      </div>
    ) },
    { field: 'download_report', headerName: '다운로드', renderCell: params => <SaveAltIcon />},
  ], []);
  const rows = [
    {
      id: 1,
      name: "IFRS S2 보고서",
      group_name: "당진 2공장(로미유리 제조)",
      workplace_name: "당진 2공장(로미유리 제조)",
      target_date: "123~345",
      create_date: "1234-12-34",
    }
  ]
  
  const NoRowsOverlay = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <InfoOutlinedIcon sx={{size: "18px", color: "#757575"}} />
            <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>생성된 보고서 내역이 없습니다.</div>
            <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>보고서 생성 버튼을 눌러 보고서를 작성해주세요.</div>
          </div>
      </div>
    )
  }


  return (
    <div style={{ backgroundColor: "#eee", width: "calc(100% - 236px)", height: "100%", padding: "24px", boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: "24px"
    }}>
      <div style={{display: "flex", gap: "6px"}}>
        <Select
          displayEmpty
          value=""
          sx={{width: 338}}
          size="small"
          fullWidth
          IconComponent={ExpandMoreIcon}
          renderValue={selected => {
            if(selected.length === 0){
              return <Typography style={{fontSize: "13px", color: "#AAAAAA"}}>조직 범위</Typography>
            }
            return <Typography style={{fontSize: "13px", color: "#111111", fontWeight: "bold"}}>{selected}</Typography>;
          }}
        >
          <MenuItem value={1}>전체</MenuItem>
          <MenuItem value={1}>본사</MenuItem>
          <MenuItem value={1}>지사</MenuItem>
          <MenuItem value={1}>사업장</MenuItem>
        </Select>
        <BaseYearSelect ref={baseYearRef} displayItemCount={5} />
      </div>
      <ContentBody padding={"24px"} gap="16px">
        <SubTitle title={"보고서 리스트"}>
          <div style={{display: "flex", gap: "8px"}}>
            <Button sx={{width: "113px", fontSize: "14px", padding: "6px"}} variant="btnActive" onClick={()=>navigate("/report/create")}>보고서 생성</Button>
            <Button sx={{width: "113px", fontSize: "14px", padding: "6px"}} variant="btnInit">전체 다운로드</Button>
          </div>
        </SubTitle>
        <DataGrid
          columns={columns}
          rows={rows}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
          checkboxSelection
        />
      </ContentBody>
    </div>
  )
}

export default ReportList;
