import React from "react";
import './button.css'
const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={`button button-${variant}`}
      onClick={onClick}
    >
      {children} {}
    </button>
  );
};
export default Button;