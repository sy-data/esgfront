import { atom } from "recoil";

// 기준년도 활동자료
export const baseYearActivityInfomationAtom = atom({
  key: "baseYearActivityInfomation",
  default: [],
});

// 근거자료
export const baseInformationThreeOneAtom = atom({
  key: "baseInformationThreeOneAtom",
  default: [],
});

// 근거자료에 해당하는 파일 목록
export const baseInformationFileAtom = atom({
  key: "baseInformationFile",
  default: [
    {
      id: 1,
      fileName: "전력사용.txt",
      fileSize: "20MB",
    },
    {
      id: 2,
      fileName: "휘발류사용.txt",
      fileSize: "20MB",
    },
  ],
});

export const baseYearActivityInfomationAtomDummyData = [
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

export const baseInformationAtomDummyData = [
  {
    id: 1,
    date: "1월",
    activity: "이동연소(도로)",
    fuel: "휘발류",
    etc: "비고",
    file: "근거자료(파일)",
  },
  {
    id: 2,
    date: "2월",
    activity: "이동연소(도로)",
    fuel: "전기",
    etc: "비고",
    file: "근거자료(파일)",
  },
];
