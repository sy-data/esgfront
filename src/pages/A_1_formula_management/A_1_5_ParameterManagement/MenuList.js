const MenuList = [
  {
    id: "parameterGroup01",
    type: "menu-parent",
    name: "활동량",
    children: [
      {
        id: "activity1",
        type: "menu-child",
        name: "이산화탄소(CO2) 배출량",
      },
      {
        id: "activity2",
        type: "menu-child",
        name: "메탄(CH4) 배출량",
      },
      {
        id: "activity3",
        type: "menu-child",
        name: "아산화질소(N2O) 배출량",
      },
    ],
  },
  {
    id: "parameterGroup02",
    type: "menu-parent",
    name: "에너지 사용량",
    children: [],
  },
  {
    id: "parameterGroup03",
    type: "menu-parent",
    name: "산화계수",
    children: [
      {
        id: "oxidationCoefficient1",
        type: "menu-child",
        name: "산화계수",
      },
    ],
  },
  {
    id: "parameterGroup04",
    type: "menu-parent",
    name: "발열량계수",
    children: [
      {
        id: "heat1",
        type: "menu-child",
        name: "총 발열량 계수",
      },
      {
        id: "heat2",
        type: "menu-child",
        name: "순발열량 계수",
      },
    ],
  },
  {
    id: "parameterGroup05",
    type: "menu-parent",
    name: "배출계수",
    children: [
      {
        id: "emission1",
        type: "menu-child",
        name: "이산화탄소(CO2) 배출계수",
      },
      {
        id: "emission2",
        type: "menu-child",
        name: "메탄(CH4) 배출계수",
      },
      {
        id: "emission3",
        type: "menu-child",
        name: "아산화질소(N2O) 배출계수",
      },
    ],
  },
  {
    id: "parameterGroup06",
    type: "menu-parent",
    name: "기타계수",
  },
  {
    id: "parameterGroup07",
    type: "menu-parent",
    name: "원단위",
  },
  {
    id: "parameterGroup08",
    type: "menu-parent",
    name: "입주율",
  },
  {
    id: "parameterGroup09",
    type: "menu-parent",
    name: "단위변환",
  },
  {
    id: "parameterGroup10",
    type: "menu-parent",
    name: "기타그룹",
  },
];

export default MenuList;
