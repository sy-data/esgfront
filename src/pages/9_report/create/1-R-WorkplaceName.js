import SubTitle from "../../../components/SubTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import "./1-R-WorkplaceName.css";


const WorkplaceName = props => {
  const WorkplaceItem = props => {
    return (
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label={<Typography style={{fontSize:"16px", fontWeight:"bold"}}>{props.name}</Typography>}
          />
        </FormGroup>
        <div className="wp-scope">
          <div className="scope-percentage-wrapper">
            <div className="scope-mark green">Scope1</div>
            <div className="scope-percentage black">100%</div>
          </div>
          <div className="scope-divider" />
          <div className="scope-percentage-wrapper">
            <div className="scope-mark red">Scope2</div>
            <div className="scope-percentage red">100%</div>
          </div>
          <div className="scope-divider" />
          <div className="scope-percentage-wrapper">
            <div className="scope-mark gray">Scope3</div>
            <div className="scope-percentage gray">100%</div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div style={{flex: 6, padding: "24px 0"}}>
      <div style={{padding: "0 24px"}}><SubTitle title={"사업장명"} /></div>
      <div className="wp-list">
        <WorkplaceItem name={"조직 전체 통합"} />
        <WorkplaceItem name={"본사"} />
        <WorkplaceItem name={"당진 1공장"} />
        <WorkplaceItem name={"당진 2공장"} />
        <WorkplaceItem name={"인천사무소"} />
      </div>
    </div>
  )
};

export default WorkplaceName;
