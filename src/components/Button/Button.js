/** @format */

import { Icon } from "@iconify/react";
import "./Button.css";

export const Button = {
  Category: ({ handleClick, title }) => {
    return (
      <button className='category' onClick={handleClick}>
        {title}
      </button>
    );
  },
  Tab: ({ handleClick, title }) => {
    return (
      <button className='tab' onClick={handleClick}>
        {title}
      </button>
    );
  },
  Icon: ({ label, action, handleClick }) => {
    return (
      <button className='action' onClick={handleClick}>
        <Icon
          icon={
            action === "add"
              ? "material-symbols:add"
              : action === "edit"
              ? "ic:baseline-check"
              : "material-symbols:delete-outline-rounded"
          }
          color={action === "add" ? "#0092FF" : "#F90606"}
          width={20}
        />
        {label}
      </button>
    );
  },
  Sm: ({ label, type, handleClick }) => {
    return (
      <button type={type} className='btn' onClick={handleClick}>
        {label}
      </button>
    );
  },
  Lg: ({ label, type, handleClick }) => {
    return (
      <button type={type} className='btn btn-lg' onClick={handleClick}>
        {label}
      </button>
    );
  },
  Toggle: () => {
    const root = document.querySelector(":root");
    const toggleMode = () => {
      root.classList.toggle("dark");
    };
    return (
      <button onClick={toggleMode} className='mr'>
        <Icon icon='mdi:circle-half-full' width={24} />
      </button>
    );
  },
};
