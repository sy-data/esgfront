const MenuList = [
  {
    id: "Scope1",
    type: "menu-parent",
    name: "Scope 1",
    children: [
      {
        id: "Scope1-1",
        type: "menu-child",
        name: "고정연소",
      },
      {
        id: "Scope1-2",
        type: "menu-child",
        name: "이동연소",
      },
      {
        id: "Scope1-3",
        type: "menu-child",
        name: "폐기물소각",
        children: [
          {
            id: "Scope1-3-1",
            type: "menu-child",
            name: "고상",
            children: [
              {
                id: "Scope1-3-1-1",
                type: "menu-child",
                name: "생활폐기물",
              },
              {
                id: "Scope1-3-1-2",
                type: "menu-child",
                name: "사업장폐기물",
              },
              {
                id: "Scope1-3-1-3",
                type: "menu-child",
                name: "하수슬러지",
              },
            ],
          },
          {
            id: "Scope1-3-2",
            type: "menu-child",
            name: "액상",
            children: [
              {
                id: "Scope1-3-2-1",
                type: "menu-child",
                name: "생활폐기물",
              },
              {
                id: "Scope1-3-2-2",
                type: "menu-child",
                name: "사업장폐기물",
              },
              {
                id: "Scope1-3-2-3",
                type: "menu-child",
                name: "하수슬러지",
              },
            ],
          },
          {
            id: "Scope1-3-3",
            type: "menu-child",
            name: "기상",
          },
        ],
      },
    ],
  },
  {
    id: "Scope2",
    type: "menu-parent",
    name: "Scope 2",
    children: [
      {
        id: "Scope2-1",
        type: "menu-child",
        name: "공정배출",
        children: [
          {
            id: "Scope2-1-1",
            type: "menu-child",
            name: "석회생산량",
            children: [
              {
                id: "Scope2-1-1-1",
                type: "menu-child",
                name: "생석회",
              },
            ],
          },
        ],
      },
      {
        id: "Scope2-2",
        type: "menu-child",
        name: "전력사용시설",
        children: [
          {
            id: "Scope2-2-1",
            type: "menu-child",
            name: "전기소비",
          },
        ],
      },
      {
        id: "Scope2-3",
        type: "menu-child",
        name: "열사용시설",
        children: [
          {
            id: "Scope2-3-1",
            type: "menu-child",
            name: "열소비",
          },
        ],
      },
      {
        id: "Scope2-4",
        type: "menu-child",
        name: "스팀사용시설",
        children: [
          {
            id: "Scope2-4-1",
            type: "menu-child",
            name: "스팀(일반)",
          },
          {
            id: "Scope2-4-2",
            type: "menu-child",
            name: "스팀(열병합)",
          },
          {
            id: "Scope2-4-3",
            type: "menu-child",
            name: "스팀(열전용)",
          },
        ],
      },
    ],
  },
  {
    id: "Scope3",
    type: "menu-parent",
    name: "Scope 3",
    children: [
      {
        id: "Scope3-1",
        type: "menu-child",
        name: "UpStream",
        children: [
          {
            id: "Scope3-1-1",
            type: "menu-child",
            name: "구매한 상품",
            children: [
              {
                id: "Scope3-1-1-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-2",
            type: "menu-child",
            name: "구매한 서비스",
            children: [
              {
                id: "Scope3-1-2-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-3",
            type: "menu-child",
            name: "자본재",
            children: [
              {
                id: "Scope3-1-3-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-4",
            type: "menu-child",
            name: "연료",
            children: [
              {
                id: "Scope3-1-4-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-5",
            type: "menu-child",
            name: "에너지",
            children: [
              {
                id: "Scope3-1-5-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-6",
            type: "menu-child",
            name: "업스트림 운송",
            children: [
              {
                id: "Scope3-1-6-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-7",
            type: "menu-child",
            name: "업스트림 유통",
            children: [
              {
                id: "Scope3-1-7-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-1-8",
            type: "menu-child",
            name: "폐기물",
            children: [
              {
                id: "Scope3-1-8-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
        ],
      },
      {
        id: "Scope3-2",
        type: "menu-child",
        name: "DownStream",
        children: [
          {
            id: "Scope3-2-1",
            type: "menu-child",
            name: "출장",
            children: [
              {
                id: "Scope3-2-1-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-2",
            type: "menu-child",
            name: "통근",
            children: [
              {
                id: "Scope3-2-2-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-3",
            type: "menu-child",
            name: "업스트림 임차자산",
            children: [
              {
                id: "Scope3-2-3-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-4",
            type: "menu-child",
            name: "다운스트림 운송",
            children: [
              {
                id: "Scope3-2-4-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-5",
            type: "menu-child",
            name: "다운스트림 유통",
            children: [
              {
                id: "Scope3-2-5-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-6",
            type: "menu-child",
            name: "판매된 제품가공",
            children: [
              {
                id: "Scope3-2-6-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-7",
            type: "menu-child",
            name: "판매된 제품사용",
            children: [
              {
                id: "Scope3-2-7-1",
                type: "menu-child",
                name: "자동차",
              },
            ],
          },
          {
            id: "Scope3-2-8",
            type: "menu-child",
            name: "판매된 제품폐기",
          },
          {
            id: "Scope3-2-9",
            type: "menu-child",
            name: "다운스트림 임대자산",
          },
          {
            id: "Scope3-2-10",
            type: "menu-child",
            name: "프랜차이즈",
          },
          {
            id: "Scope3-2-11",
            type: "menu-child",
            name: "투자",
          },
        ],
      },
    ],
  },
];

export default MenuList;
