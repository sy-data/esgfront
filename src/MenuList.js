const MenuList = [
  {
    id: "S",
    type: "menu-parent",
    name: "산정식 관리",
    action: () => console.log("action"),
    children: [
      {
        id: "S-1",
        type: "menu-child",
        name: "산정식그룹관리",
        link: "/admin-formula/CalculationGroupManagement",
      },
      {
        id: "S-2",
        type: "menu-child",
        name: "산정식등록",
        link: "/admin-formula",
      },
      {
        id: "S-3",
        type: "menu-child",
        name: "산정식변경이력조회",
        link: "/admin-formula",
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
        link: "/admin-formula",
      },
      {
        id: "S-6",
        type: "menu-child",
        name: "산정식규정등급관리",
        link: "/admin-formula",
      },
    ],
  },
  {
    id: "F",
    type: "menu-parent",
    name: "연료관리",
    children: [
      {
        id: "F-1",
        type: "menu-child",
        name: "배출활동연료매핑",
        link: "/admin-fuel/mapping",
      },
      {
        id: "F-2",
        type: "menu-child",
        name: "연료비용",
        link: "/admin-fuel/cost",
      },
    ],
  },
  {
    id: "U",
    type: "menu-parent",
    name: "시스템/사용자관리",
    children: [
      {
        id: "U-1",
        type: "menu-child",
        name: "사용자정보관리",
        link: "/admin-user",
      },
      {
        id: "U-2",
        type: "menu-child",
        name: "사용자접속현황",
        link: "/admin-user",
      },
      {
        id: "U-3",
        type: "menu-child",
        name: "약관관리",
        link: "/admin-user",
      },
    ],
  }
];

export default MenuList;
