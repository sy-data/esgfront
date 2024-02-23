import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ArrowRight from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";

const LeftNavigation = () => {
  const navigate = useNavigate();

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
    >
      <TreeItem nodeId="0" label="샘플페이지" onClick={() => navigate("/e_s/sample")} />
      <TreeItem nodeId="1" label="시설정보관리">
        <TreeItem nodeId="1-1" label="사업장관리" onClick={() => navigate("/facility/workplace")} icon={<ArrowRight />} />
        <TreeItem nodeId="1-2" label="사업장별 시설정보 관리" onClick={() => navigate("/facility/information")} icon={<ArrowRight />} />
        <TreeItem nodeId="1-3" label="시설 이력 조회" onClick={() => navigate("/facility/history")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="2" label="배출원 관리">
        <TreeItem nodeId="2-1" label="사업장별 생산품 관리" onClick={() => navigate("/source/product")} icon={<ArrowRight />} />
        <TreeItem nodeId="2-2" label="배출활동 연료 관리" onClick={() => navigate("/source/fuel")} icon={<ArrowRight />} />
        <TreeItem nodeId="2-3" label="배출활동 파라미터 관리" onClick={() => navigate("/source/")} icon={<ArrowRight />} />
        <TreeItem nodeId="2-4" label="스팀관리" onClick={() => navigate("/source/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="3" label="활동자료 관리">
        <TreeItem nodeId="3-1" label="배출량 활동자료 등록" onClick={() => navigate("/activity")} icon={<ArrowRight />} />
        <TreeItem nodeId="3-2" label="에너지 비용 등록" onClick={() => navigate("/activity")} icon={<ArrowRight />} />
        <TreeItem nodeId="3-3" label="하/폐수 활동자료 등록" onClick={() => navigate("/activity")} icon={<ArrowRight />} />
        <TreeItem nodeId="3-4" label="스팀 활동자료 등록" onClick={() => navigate("/activity")} icon={<ArrowRight />} />
        <TreeItem nodeId="3-5" label="생산량 활동자료 등록" onClick={() => navigate("/activity")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="4" label="온실가스 배출량">
        <TreeItem nodeId="4-1" label="DashBoard" onClick={() => navigate("/emissions/")} icon={<ArrowRight />} />
        <TreeItem nodeId="4-2" label="법인별 비교분석" onClick={() => navigate("/emissions/")} icon={<ArrowRight />} />
        <TreeItem nodeId="4-3" label="사업장 연도/월별 비교분석" onClick={() => navigate("/emissions/")} icon={<ArrowRight />} />
        <TreeItem nodeId="4-4" label="연료별 비교분석" onClick={() => navigate("/emissions/")} icon={<ArrowRight />} />
        <TreeItem nodeId="4-5" label="scope별 비교분석" onClick={() => navigate("/emissions/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="5" label="에너지 사용량">
        <TreeItem nodeId="5-1" label="DashBoard" onClick={() => navigate("/usage/")} icon={<ArrowRight />} />
        <TreeItem nodeId="5-1" label="법인별 비교분석" onClick={() => navigate("/usage/")} icon={<ArrowRight />} />
        <TreeItem nodeId="5-2" label="사업장 연도/월별 비교분석" onClick={() => navigate("/usage/")} icon={<ArrowRight />} />
        <TreeItem nodeId="5-3" label="연료별 비교분석" onClick={() => navigate("/usage/")} icon={<ArrowRight />} />
        <TreeItem nodeId="5-4" label="scope별 비교분석" onClick={() => navigate("/usage/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="6" label="목표 및 성과">
        <TreeItem nodeId="6-1" label="법인별 목표 등록" onClick={() => navigate("/target_result/corporation-target")} icon={<ArrowRight />} />
        <TreeItem nodeId="6-2" label="사업장별 목표 등록" onClick={() => navigate("/target_result/factory-target")} icon={<ArrowRight />} />
        <TreeItem nodeId="6-3" label="성과 현황" onClick={() => navigate("/target_result/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="7" label="통계">
        <TreeItem nodeId="7-1" label="정부보고 배출량 현황" onClick={() => navigate("/statistics/emissions-status")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-2" label="총괄 현황" onClick={() => navigate("/statistics/")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-3" label="제품 배출량 원단위" onClick={() => navigate("/statistics/")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-4" label="제품 에너지 원단위" onClick={() => navigate("/statistics")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-5" label="에너지 사용량 원단위" onClick={() => navigate("/statistics/")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-6" label="에너지 비용 원단위" onClick={() => navigate("/statistics/")} icon={<ArrowRight />} />
        <TreeItem nodeId="7-7" label="첨부파일 다운로드" onClick={() => navigate("/statistics/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="8" label="모니터링">
        <TreeItem nodeId="8-1" label="기준연도 데이터 복사" onClick={() => navigate("/monitoring/")} icon={<ArrowRight />} />
        <TreeItem nodeId="8-2" label="사용량 등록 모니터링" onClick={() => navigate("/monitoring/")} icon={<ArrowRight />} />
        <TreeItem nodeId="8-3" label="생산품 시설 모니터링" onClick={() => navigate("/monitoring/")} icon={<ArrowRight />} />
      </TreeItem>
      <TreeItem nodeId="9" label="관리자(임시)">
        <TreeItem nodeId="9-1" label="산정식 관리">
          <TreeItem nodeId="9-1-1" label="산정식 등록" onClick={() => navigate("/admin-formula")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-1-2" label="산정식 변경이력조회" onClick={() => navigate("/admin-formula")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-1-3" label="파라미터 그룹 관리" onClick={() => navigate("/admin-formula")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-1-4" label="파라미터 관리" onClick={() => navigate("/admin-formula")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-1-5" label="산정식 규정등급 관리" onClick={() => navigate("/admin-formula")} icon={<ArrowRight/>} />
        </TreeItem>
        <TreeItem nodeId="9-2" label="연료 관리">
          <TreeItem nodeId="9-2-1" label="배출활동 연료 매핑" onClick={() => navigate("/admin-fuel/mapping")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-2-2" label="배출활동 연료 비용" onClick={() => navigate("/admin-fuel/cost")} icon={<ArrowRight/>} />
        </TreeItem>
        <TreeItem nodeId="9-3" label="시스템/사용자 관리">
          <TreeItem nodeId="9-3-1" label="사용자 정보관리" onClick={() => navigate("/admin-management")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-3-2" label="사용자 접속현황" onClick={() => navigate("/admin-management")} icon={<ArrowRight/>} />
          <TreeItem nodeId="9-3-3" label="약관관리" onClick={() => navigate("/admin-management")} icon={<ArrowRight/>} />
        </TreeItem>
      </TreeItem>
    </TreeView>
  )
}

export default LeftNavigation;
