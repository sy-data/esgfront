import { atom } from "recoil";
import MenuList from "../../components/navigationTree/MenuList";

export const treeStateAtom = atom({
  key: "treeState",
  default: MenuList.map(menu => ({id: menu.id, opened: false, children: menu.children.map(child => ({id: child.id, opened: false}))})),
});
