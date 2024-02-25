import { atom } from "recoil";

// 스팀 정보
export const steamInformationAtom = atom({
  key: "steamInformation",
  default: [],
});

// 근거자료
export const baseInformationAtom = atom({
  key: "baseInformation",
  default: [],
});

// 근거자료에 해당하는 파일 목록
export const baseInformationFileAtom = atom({
  key: "baseInformationFile",
  default: [],
});
