import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLessIcon, ExpandMoreIcon, ArrowRightIcon } from "./Icons";

const getStyles = (isSelected) => ({
  listItem: {
    color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
    fontFamily: isSelected ? "'Pretendard Variable'" : "inherit",
    fontSize: isSelected ? "16px" : "inherit",
    fontStyle: isSelected ? "normal" : "inherit",
    fontWeight: isSelected ? 700 : "inherit",
    lineHeight: isSelected ? "150%" : "inherit",
    letterSpacing: isSelected ? "-0.32px" : "inherit",
  },
  listItemIcon: {
    color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
    marginRight: "-20px",
  },
});

const ParameterGroupTree = ({
  nodes, // 트리 구조의 노드 배열
  open, // 각 노드의 확장 상태를 나타내는 객체
  handleToggle, // 노드 확장/축소를 처리하는 함수
  setSelectedGroup, // 선택된 그룹을 설정하는 함수
  selectedGroup, // 현재 선택된 그룹 ID
}) => {
  const renderTree = (nodes) =>
    nodes.map((node) => {
      const isSelected = selectedGroup === node.id; // 현재 노드가 선택되었는지 확인합니다.
      const styles = getStyles(isSelected);

      return (
        <React.Fragment key={node.id}>
          <ListItem
            button
            onClick={() => {
              handleToggle(node.id); // 노드 확장/축소를 처리합니다.
              setSelectedGroup(node.id); // 선택된 그룹을 설정합니다.
            }}
            selected={isSelected} // 현재 노드가 선택되었는지 여부를 설정합니다.
            sx={styles.listItem}
          >
            <ListItemIcon sx={styles.listItemIcon}>
              {node.children ? (
                open[node.id] ? (
                  <ExpandLessIcon isSelected={isSelected} /> // 노드가 확장된 경우 축소 아이콘을 렌더링합니다.
                ) : (
                  <ExpandMoreIcon isSelected={isSelected} /> // 노드가 축소된 경우 확장 아이콘을 렌더링합니다.
                )
              ) : (
                <ArrowRightIcon isSelected={isSelected} /> // 자식이 없는 노드의 경우 오른쪽 화살표 아이콘을 렌더링합니다.
              )}
            </ListItemIcon>
            <ListItemText primary={node.name} />
          </ListItem>

          {node.children && (
            <Collapse in={open[node.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {renderTree(node.children)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });

  // 루트 노드 리스트를 렌더링합니다.
  return <List>{renderTree(nodes)}</List>;
};

export default ParameterGroupTree;
