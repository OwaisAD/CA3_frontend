import React from "react";

const Button = ({ text, onClick, isLogin, isHeaderLogin}) => {
    
    const isLoginButton = isLogin ? "login-button" : ""
    const isHeaderLoginButton = isHeaderLogin ? "login-container" : ""


  return (
      <button className={`glow-on-hover ${isLoginButton} ${isHeaderLoginButton}`} onClick={onClick}>
        {text}
      </button>
  );
};

export default Button;
