const MenuList = [
  {
    id: "1",
    type: "menu-parent",
    name: "시설정보관리",
    children: [
      {
        id: "1-1",
        type: "menu-child",
        name: "사업장관리",
        link: "/facility/workplace",
      },
      {
        id: "1-2",
        type: "menu-child",
        name: "사업장별 시설정보 관리",
        link: "/facility/information",
      },
      {
        id: "1-3",
        type: "menu-child",
<<<<<<< HEAD
        name: "산정식변경이력조회",
        link: "/admin-formula/calcFCHistoryInquiry",
      },
      {
        id: "S-4",
        type: "menu-child",
        name: "파라미터그룹관리",
        link: "/admin-formula/groupManagement",
      },
      {
        id: "S-5",
        type: "menu-child",
        name: "파라미터관리",
        link: "/admin-formula/parameterManagement",
      },
      {
        id: "S-6",
        type: "menu-child",
        name: "산정식규정등급관리",
        link: "/admin-formula",
      },
=======
        name: "시설 이력 조회",
        link: "/facility/history",
      }
>>>>>>> d24b57c7b5e90083fcdb440cc4a67a42c61e867e
    ],
  },
  {
    id: "2",
    type: "menu-parent",
    name: "배출원 관리",
    children: [
      {
        id: "2-1",
        type: "menu-child",
        name: "사업장별 생산품 관리",
        link: "/facility/workplace",
      },
      {
        id: "2-2",
        type: "menu-child",
        name: "배출활동 연료 관리",
        link: "/facility/information",
      },
      {
        id: "2-3",
        type: "menu-child",
        name: "배출활동 파라미터 관리",
        link: "/facility/history",
      },
      {
        id: "2-4",
        type: "menu-child",
        name: "스팀관리",
        link: "/facility/history",
      }
    ],
  },
  {
    id: "3",
    type: "menu-parent",
    name: "활동자료 관리",
    children: [
      {
        id: "3-1",
        type: "menu-child",
        name: "배출량 활동자료 등록",
        link: "/activity/activityDataAdd",
      },
      {
        id: "3-2",
        type: "menu-child",
        name: "에너지 비용 등록",
        link: "/activity/energyCostAdd",
      },
      {
        id: "3-3",
        type: "menu-child",
        name: "하/폐수 활동자료 등록",
        link: "/activity/sewageWastewaterAdd",
      },
      {
        id: "3-4",
        type: "menu-child",
        name: "스팀 활동자료 등록",
        link: "/activity/steamAdd",
      },
      {
        id: "3-5",
        type: "menu-child",
        name: "생산량 활동자료 등록",
        link: "/activity/productionAdd",
      }
    ],
  },
  {
    id: "4",
    type: "menu-parent",
    name: "온실가스 배출량",
    children: [
      {
        id: "4-1",
        type: "menu-child",
        name: "DashBoard",
        link: "/emissions/dashboard",
      },
      {
        id: "4-2",
        type: "menu-child",
        name: "법인별 비교분석",
        link: "/emissions/company",
      },
      {
        id: "4-3",
        type: "menu-child",
        name: "사업장 연도/월별 비교분석",
        link: "/emissions/workplace",
      },
      {
        id: "4-4",
        type: "menu-child",
        name: "연료별 비교분석",
        link: "/emissions/fuel",
      },
      {
        id: "4-5",
        type: "menu-child",
        name: "scope별 비교분석",
        link: "/emissions/scope",
      }
    ],
  },
  {
    id: "5",
    type: "menu-parent",
    name: "에너지 사용량",
    children: [
      {
        id: "5-1",
        type: "menu-child",
        name: "DashBoard",
        link: "/usage/dashboard",
      },
      {
        id: "5-2",
        type: "menu-child",
        name: "법인별 비교분석",
        link: "/usage/company",
      },
      {
        id: "5-3",
        type: "menu-child",
        name: "사업장 연도/월별 비교분석",
        link: "/usage/workplace",
      },
      {
        id: "5-4",
        type: "menu-child",
        name: "연료별 비교분석",
        link: "/usage/fuel",
      },
      {
        id: "5-5",
        type: "menu-child",
        name: "scope별 비교분석",
        link: "/usage/scope",
      }
    ],
  },
  {
    id: "6",
    type: "menu-parent",
    name: "목표 및 성과",
    children: [
      {
        id: "6-1",
        type: "menu-child",
        name: "법인별 목표 등록",
        link: "/target_result/corporation-target",
      },
      {
        id: "6-2",
        type: "menu-child",
        name: "사업장별 목표 등록",
        link: "/target_result/factory-target",
      },
      {
        id: "6-3",
        type: "menu-child",
        name: "연단위 성과현황(법인)",
        link: "/target_result/performance-status/company",
      },
      {
        id: "6-4",
        type: "menu-child",
        name: "연단위 성과현황(사업장)",
        link: "/target_result/performance-status/factory",
      },
      {
        id: "6-5",
        type: "menu-child",
        name: "월단위 성과현황(사업장)",
        link: "/target_result/performance-status/factory-monthly",
      }
    ],
  },
  {
    id: "7",
    type: "menu-parent",
    name: "통계",
    children: [
      {
        id: "7-1",
        type: "menu-child",
        name: "정부보고 배출량 현황",
        link: "/statistics/emissions-status",
      },
      {
        id: "7-2",
        type: "menu-child",
        name: "총괄 현황",
        link: "/statistics",
      },
      {
        id: "7-3",
        type: "menu-child",
        name: "제품 배출량 원단위",
        link: "/statistics/production-emiisions",
      },
      {
        id: "7-4",
        type: "menu-child",
        name: "제품 에너지 원단위",
        link: "/statistics/production-energy",
      },
      {
        id: "7-5",
        type: "menu-child",
        name: "에너지 사용량 원단위",
        link: "/statistics/energy-usage",
      },
      {
        id: "7-6",
        type: "menu-child",
        name: "에너지 비용 원단위",
        link: "/statistics/energy-costs",
      },
      {
        id: "7-7",
        type: "menu-child",
        name: "첨부파일 다운로드",
        link: "/statistics",
      }
    ],
  },
];

export default MenuList;
