import React from "react";

export const ExpandLessIcon = ({ isSelected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 16.5002L4.5 9.00019L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.00019L12 16.5002Z"
      fill={isSelected ? "#00B096" : "#111111"}
    />
  </svg>
);

export const ExpandMoreIcon = ({ isSelected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
      fill={isSelected ? "#00B096" : "#757575"}
    />
  </svg>
);

export const ArrowRightIcon = ({ isSelected }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M16.55 11.5L9.05 19L8 17.95L14.45 11.5L8 5.05L9.05 4L16.55 11.5Z"
      fill={isSelected ? "#00B096" : "#757575"}
    />
  </svg>
);
