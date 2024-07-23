import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLessIcon, ExpandMoreIcon, ArrowRightIcon } from "./Icons";

const ParameterGroupTree = ({
  nodes,
  open,
  handleToggle,
  setSelectedGroup,
  selectedGroup,
}) => {
  const renderTree = (nodes) =>
    nodes.map((node) => {
      const isSelected = selectedGroup === node.id;
      return (
        <React.Fragment key={node.id}>
          <ListItem
            button
            onClick={() => {
              handleToggle(node.id);
              setSelectedGroup(node.id);
            }}
            selected={isSelected}
            sx={{
              color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
              fontFamily: isSelected ? "'Pretendard Variable'" : "inherit",
              fontSize: isSelected ? "16px" : "inherit",
              fontStyle: isSelected ? "normal" : "inherit",
              fontWeight: isSelected ? 700 : "inherit",
              lineHeight: isSelected ? "150%" : "inherit", // 24px
              letterSpacing: isSelected ? "-0.32px" : "inherit",
            }}
          >
            <ListItemIcon
              sx={{
                color: isSelected ? "var(--Primary-04, #00B096)" : "inherit",
                marginRight: "-20px",
              }}
            >
              {node.children ? (
                open[node.id] ? (
                  <ExpandLessIcon isSelected={isSelected} />
                ) : (
                  <ExpandMoreIcon isSelected={isSelected} />
                )
              ) : (
                <ArrowRightIcon isSelected={isSelected} />
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

  return <List>{renderTree(nodes)}</List>;
};

export default ParameterGroupTree;
