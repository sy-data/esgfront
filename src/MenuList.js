const MenuList = [
  {
    id: "1",
    type: "menu-parent",
    name: "사업장 기본정보",
    children: [
      {
        id: "1-1",
        type: "menu-child",
        name: "사업장관리",
        link: "/facility/workplace"
      },
      {
        id: "1-2",
        type: "menu-child",
        name: "시설정보관리",
        link: "/facility/information"
      }
    ]
  },
  {
    id: "2",
    type: "menu-parent",
    name: "배출활동 관리",
    children: [
      {
        id: "2-1",
        type: "menu-child",
        name: "배출연료관리",
        link: "/management/fuel"
      },
      {
        id: "2-2",
        type: "menu-child",
        name: "배출등록모니터링",
        link: "/management/monitor"
      }
    ]
  },
  {
    id: "3",
    type: "menu-parent",
    name: "목표 관리",
    children: [
      {
        id: "3-1",
        type: "menu-child",
        name: "목표 현황",
        link: "/target/status"
      }
    ]
  },
  {
    id: "4",
    type: "menu-parent",
    name: "배출활동 분석",
    children: [
      {
        id: "4-1",
        type: "menu-child",
        name: "대시보드",
        link: "/analyze/dashboard"
      },
      {
        id: "4-2",
        type: "menu-child",
        name: "배출활동 비교분석",
        link: "/analyze/compare"
      },
      {
        id: "4-3",
        type: "menu-child",
        name: "통계 조회",
        link: "/analyze/statistics"
      }
    ]
  },
];

export default MenuList;
