import { NavLink } from "react-router-dom";
import Image from "../../images/ecodrive-logo.png";

const NavButton = ({ to, iconClass, text, onClick, isEnd, isLogo }) => {

  const NavElement = (isLogo, isEnd) => {
    if (isLogo) {
      return (
        <NavLink to="/" end>
          <img
            src={Image}
            alt="cinewatch logo"
            className="logo"
          />
        </NavLink>
      );
    } else if(isEnd) {
        return (<NavLink to={to} end onClick={onClick}>
          <i className={iconClass}></i> {text}
        </NavLink>)
    } else {
      return (<NavLink to={to} onClick={onClick}>
      <i className={iconClass}></i> {text}
    </NavLink>)
    }
  };

  return NavElement(isLogo, isEnd);
};

export default NavButton;
