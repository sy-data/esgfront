import { atom } from "recoil";

// 에너지 비용 등록
export const energyCostDataAtom = atom({
  key: "energyCostDataAtom",
  default: [],
});

export const energyCostDataAtomDummyData = [
  {
    id: 1,
    season: "일반 승용차량",
    activity: "이동연소(도로)",
    fuel: "휘발류",
    unit: "g/km",
    jan: 112234,
    feb: 112235,
    mar: 112236,
    apr: 112734,
    may: 112234,
    jun: 612234,
    jul: 712234,
    aug: 812234,
    sep: 912234,
    oct: 241234,
    nov: 256234,
    dec: 722234,
    total: 999999999,
  },
  {
    id: 2,
    season: "전력설비",
    activity: "이동연소(도로)",
    fuel: "휘발류",
    unit: "g/km",
    jan: 112234,
    feb: 112235,
    mar: 112236,
    apr: 112734,
    may: 112234,
    jun: 612234,
    jul: 712234,
    aug: 812234,
    sep: 912234,
    oct: 241234,
    nov: 256234,
    dec: 722234,
    total: 999999999,
  },
];
