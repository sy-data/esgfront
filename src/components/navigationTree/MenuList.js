
const MenuList = [
  {
    id: "S",
    name: "산정식 관리",
    link: "/admin-formula",
    children: [
      {
        id: "S-1",
        name: "산정식그룹관리",
        link: "/admin-formula",
      },
      {
        id: "S-2",
        name: "산정식등록",
        link: "/admin-formula",
      },
      {
        id: "S-3",
        name: "산정식변경이력조회",
        link: "/admin-formula",
      },
      {
        id: "S-4",
        name: "파라미터그룹관리",
        link: "/admin-formula/groupManagement",
      },
      {
        id: "S-5",
        name: "파라미터관리",
        link: "/admin-formula",
      },
      {
        id: "S-6",
        name: "산정식규정등급관리",
        link: "/admin-formula",
      },
    ]
  },
  {
    id: "F",
    name: "연료관리",
    link: "/admin-fuel",
    children: [
      {
        id: "F-1",
        name: "배출활동연료매핑",
        link: "/admin-fuel"
      },
      {
        id: "F-2",
        name: "연료비용",
        link: "/admin-fuel"
      }
    ]
  },
  {
    id: "U",
    name: "시스템/사용자관리",
    link: "/admin-user",
    children: [
      {
        id: "U-1",
        name: "사용자정보관리",
        link: "/admin-user"
      },
      {
        id: "U-2",
        name: "사용자접속현황",
        link: "/admin-user"
      },
      {
        id: "U-3",
        name: "약관관리",
        link: "/admin-user"
      }
    ]
  }
];

export default MenuList;
