import {useState} from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SvgIcon from "@mui/material/SvgIcon";
import SubTitle from "../../../components/SubTitle";

const FacilityGroups = props => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  const GroupListItem = ({index, name, type, count}) => {
    const color = selectedIndex === index ? "#00B096" : "#757575";
    
    return (
      <ListItemButton
        sx={{borderRadius: "8px", padding: "11px 16px", height: 48}}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div style={{display: "flex"}}>
            <div style={{width: "37px", height: "26px", borderRadius: "8px", border: `1px solid ${color}`, boxSizing: "border-box",
              display:"flex", alignItems:"center", justifyContent:"center", marginRight: "8px",
              color: color, fontSize: "12px", fontWeight: "bold"}}>{type}</div>
            <div style={{display: "flex", alignItems: "center", fontSize: "16px", fontWeight: "bold", color: color, height: "26px"}}>
              {name}
            </div>
          </div>
          <div style={{display: "flex"}}>
            <div style={{display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "bold", color: color, height: "26px", paddingBottom: "5px", boxSizing: "border-box"}}>
              ({count})
            </div>
            <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z" fill={color} />
            </SvgIcon>
          </div>
        </div>
      </ListItemButton>
    );
  }
  return (
    <div style={{padding: "24px", display: "flex", flex: 1, flexDirection: "column", gap: "14px", borderRight: "1px solid #EEEEEE", borderRadius: "8px", backgroundColor: "#FFFFFF"}}>
      <SubTitle title={"조직명"} />
      <List component="nav" aria-label="secondary mailbox folder">
        <GroupListItem index={1} type={"법인"} name={"(주) 이스코프"} count={5} />
        <GroupListItem index={2} type={"법인"} name={"(주) 하우스코프"} count={3} />
        <GroupListItem index={3} type={"개인"} name={"(주) 에스물류"} count={4} />
        <GroupListItem index={4} type={"법인"} name={"(주) 미국 CA 사무소"} count={2} />
        {props.groupList.map((group, index)=><GroupListItem index={index} type={group.type} name={group.name} count={group.count} onClick={props.updateFacilityList} />)}
      </List>
    </div>
  )
}

export default FacilityGroups;
