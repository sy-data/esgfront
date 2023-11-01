import { esgFetch } from "../../components/FetchWrapper";

const ManageWorkplace = () => {
  const checkFetch = () => {
    esgFetch('/api/factories?filters[company][id][$eq]=1')
      .then(response => response.json())
      .then(data => console.log(data));
  };
  
  return (
    <div onClick={() => checkFetch()}>
      사업장 관리
    </div>
  )
}

export default ManageWorkplace;
