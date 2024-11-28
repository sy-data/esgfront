import { atom } from "recoil";

export const userStateAtom = atom({
  key: "userState",
  default: {},
});

export const loginFailCountAtom = atom({
  key: "loginFailCount",
  default: 0,
});
