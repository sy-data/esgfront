import { useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Modal, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const HsModal = props => {
  const termRef = useRef();
  const manualRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchButtonClick = () => setSearchTerm(termRef.current.value);
  const handleTermKeyDown = e => {
    if(e.key === "Enter"){
      e.preventDefault();
      handleSearchButtonClick();
    }
  }

  const [openModal, setOpenModal] = useState(false);
  
  const openParameter = e => {
    console.log(e)
    setOpenModal(true);
  }
  
  const NoRowsOverlay = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", padding: '5px 0px', backgroundColor: '#FFFFFF' }}>
        <div style={{ height: "200px", display: "flex", flexDirection: 'column', alignItems: "center", gap: "4px" }}>
          <InfoOutlinedIcon sx={{size: "13px", color: "#757575"}} />
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>검색 결과가 없습니다.</div>
          <div style={{ height: "20px", display: "flex", alignItems: "center", color: "#757575" }}>실거래 품명 또는 HSK를 다시 정확히 입력하여 조회하거나, 직접입력을 진행해주세요. </div>
          <div style={{marginTop: "20px", display: "flex", gap: "4px"}}>
            <div style={{width: "80px", fontSize: "14px", fontWeight: 600}}>생산품명</div>
            <TextField key="register_manual" placeholder="실거래 품명을 입력하세요" inputRef={manualRef} onKeyDown={handleTermKeyDown} fullWidth size="small" />
            <Button variant="btnActive" sx={{padding: 0, width: "115px"}} onClick={handleSearchButtonClick}>검색</Button>
          </div>
        </div>
      </div>
    )
  }
  
  const tableItems = useMemo(()=>[
    ["","0","1","2","3","4","5","6","7","8","9"],
    ["0","","산 동물","육과\n식용설육","어류","낙동품","기타 동물성\n생산품",`산 수목 및\n절화`,"채소","과실 · 견과류","커피 · 향신료"],
    ["10","곡물","제분공업\n생산품","채유용종자","식물성\n수액과 엑스","기타 식물성\n생산품","동 · 식물성\n유지","육 · 어류\n조제품","당류\n설탕과자","코코아","곡물 · 곡분\n의 조제품"],
    ["20","채소 · 과실\n의 조제품","각종의 조제\n식료품","음료 · 알콜\n식초","사료","담배","암석광물","금속광물","광물성 연료\n에너지","무기화학품","유기화학품"],
    ["30","의료용품","비료","유연 · \n착색제","향료 · \n화장품","비누 · 왁스","단백질계\n물질","화학류 · \n성냥","사진 · 영화\n용재료","각종 화학\n공업생산품","플라스틱"],
    ["40","고무","원피","가죽제품","모피","목재 및\n목탄","코르크","조물재료의\n제품","펄프","지와 지제품","인쇄서적 ·\n신문 · 회화"],
    ["50","견","모","면","기타 식물성\n방직용 섬유","인조\n필라멘트","인조스테이플\n섬유","워딩 · 펄프\n· 부직포","양탄자류","특수 직물","침투 · 도포\n직물"],
    ["60","편물","편물제 의류","비편물제\n의류","기타 방직용\n섬유제품","신발류","모자류","산류 ·\n지팡이","조제 우모\n · 조화 · \n인모제품","석 · 시멘트\n제품","도자 제품"],
    ["70","유리와\n유리제품","진주 · 귀석\n귀금속","철강","철강제품","동","니켈","알루미늄","유보","연","아연"],
    ["80","주석","기타 비금속","비금속제의\n공구","비금속제의\n각종 제품","기계류","전자기기","철도차량","자동차","항공기","선박"],
    ["90","과학 · 정밀\n의료기기","시계","악기","무기","가구 · 침구\n조립식건축","완구 ·\n운동용구","잡품","예술 · 수\n집과 골동품","",""]
  ],[]);
  
  const [searchResult, setSearchResult] = useState([]);
  
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Box sx={{
        padding: "24px", borderRadius: "8px", backgroundColor: "white", border: '1px solid #EEEEEE',
        position: "relative", top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: "832px", minHeight: "350px", display: "flex", flexDirection: "column", gap: "24px"
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: "bold"
        }}>HS Code 찾기</div>
        <CloseIcon sx={{position: "absolute", top:20, right:20, width: "24px", height: "24px", cursor: "pointer"}} onClick={props.onClose} />
        <div style={{display:"flex", flexDirection: "column", gap: "16px", width: "100%"}}>
          <div style={{display: 'flex', gap: '8px', width: '100%'}}>
            <TextField key="search_hscode" placeholder="실거래 품명 또는 HSK를 입력하세요" inputRef={termRef} onKeyDown={handleTermKeyDown} fullWidth size="small" />
            <Button variant="btnActive" sx={{padding: 0, width: "115px"}} onClick={handleSearchButtonClick}>검색</Button>
          </div>
          {searchTerm.length === 0 ?
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div style={{fontSize: "13px"}}>
                *입력하신 품목명은 아래 <b>HSCODE 2단위 속견표에 표시 종목으로 수출입</b> 되었습니다.<br/>
                &nbsp;&nbsp;세부 HSCODE 확인을 원하시는 <b>분류종목을 선택</b>하여 주시기 바랍니다.
              </div>
              <div style={{fontSize: "12px", fontWeight: "bold"}}><span style={{color:"#FF462D"}}>신고비율: ● 61% 이상</span> <span style={{color:"#F18D00"}}>● 31% ~ 60%</span> <span style={{color:"#E8D402"}}>● 30% 이하</span></div>
            </div>
            :
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{fontSize: "13px"}}>
                * 아래 HSCODE를 선택하시면 신고수리된 실거래명 정보를 제공합니다.<br/>
                &nbsp;&nbsp;해당 HSCODE에 대한 <b>HS 품목해설 및 신성질별 분류 해석을 참고하신 후 선택</b>하여 주시기 바랍니다.
              </div>
            </div>
          }
          
          {searchTerm.length === 0 ?
            <table style={{ borderCollapse: "collapse" }}>
              <tbody>
                {Array.from({ length: 11 }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 11 }, (_, colIndex) => {
                      const isFirstRow = rowIndex === 0;
                      const isFirstCol = colIndex === 0;

                      return (
                        <td
                          key={colIndex}
                          style={{
                            border: "1px solid #EAEAEA",
                            textAlign: "center",
                            width: isFirstCol ? "40px" : "70px",
                            height: isFirstRow ? "40px" : "70px",
                            fontSize: "13px", color: "#757575",
                            fontWeight: (isFirstCol || isFirstRow) ? "bold" : "normal"
                          }}
                        >
                          {tableItems[rowIndex][colIndex]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <DataGrid
              sx={{maxHeight: '630px'}}
              columns={[
                { field: 'id', headerName: 'No', sortable: false, width: 50 },
                { field: 'c2', headerName: 'HS CODE', sortable: false, width: 130 },
                { field: 'c3', headerName: '신고비율', sortable: false },
                { field: 'c4', headerName: 'HS 품목 해설', sortable: false, width: 220 },
                { field: 'c5', headerName: '신성질별 분류 해설', sortable: false, width: 220 },
                { field: 'c6', headerName: '기본 세율', sortable: false },
              ]}
              rows={[
                {id: '1', c2: '9032.89-4091', c3:'55.88%', c4: '반도체 제조용 기기의 것', c5: '기타 정밀기계', c6: '3%'},
                {id: '2', c2: '9032.89-4099', c3:'44.12%', c4: '기타', c5: '기타 정밀기계', c6: '5%'},
              ]}
              // rows={[]}
              slots={{
                noRowsOverlay: NoRowsOverlay,
                // loadingOverlay: LinearProgress,
              }}
              onRowClick={params => {
                setSearchTerm("");
                props.onSelect(params);
              }}
              disableColumnFilter
              disableColumnSelector
              disableColumnMenu
              disableRowSelectionOnClick
            />
          }
        </div>
      </Box>
    </Modal>
  )
};

export default HsModal;
