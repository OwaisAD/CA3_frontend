import { NavLink } from "react-router-dom";

const NavButton = ({ to, iconClass, text, onClick, isEnd }) => {
  return (
    <>
      {isEnd ? (
        <NavLink to={to} end onClick={onClick}>
          <i className={iconClass}></i> {text}
        </NavLink>
      ) : (
        <NavLink to={to} onClick={onClick}>
          <i className={iconClass}></i> {text}
        </NavLink>
      )}
    </>
  );
};

export default NavButton;
