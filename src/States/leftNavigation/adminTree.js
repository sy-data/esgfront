import { atom } from "recoil";
import MenuList from "../../AdminMenuList";
import { initTreeState } from "../../components/navigationTree/initTreeState";

export const treeStateAtom = atom({
  key: "treeState",
  default: initTreeState(MenuList)
});

export const treeOpenedLeaf = atom({
  key: "treeOpenedLeaf",
  default: ""
})
