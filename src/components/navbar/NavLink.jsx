import { NavLink } from "react-router-dom";

const NavButton = ({ to, iconClass, text, isEnd }) => {
  return (
    <>
      {isEnd ? (
        <NavLink to={to} end>
          <i className={iconClass}></i> {text}
        </NavLink>
      ) : (
        <NavLink to={to}>
          <i className={iconClass}></i> {text}
        </NavLink>
      )}
    </>
  );
};

export default NavButton;
