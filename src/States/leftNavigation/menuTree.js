import { atom } from "recoil";
import MenuList from "../../MenuList";
import { initTreeState } from "../../components/navigationTree/initTreeState";

export const menuStateAtom = atom({
  key: "menuState",
  default: initTreeState(MenuList)
});

export const menuOpenedLeaf = atom({
  key: "menuOpenedLeaf",
  default: ""
})
