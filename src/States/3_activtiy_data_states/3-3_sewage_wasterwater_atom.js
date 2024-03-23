import { atom } from "recoil";

// 하/폐수 정보
export const sewageWastwaterInfomationAtom = atom({
  key: "sewageWastwaterInfomation",
  default: [],
});

// 근거자료
export const baseInformationThreeThreeAtom = atom({
  key: "baseInformationThreeThreeAtom",
  default: [],
});

// 근거자료에 해당하는 파일 목록
export const baseInformationFileThreeThreeAtom = atom({
  key: "baseInformationFileThreeThreeAtom",
  default: [],
});
