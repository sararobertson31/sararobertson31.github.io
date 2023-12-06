import { Link } from "react-router-dom";
import VaraText from "../VaraText";
import "./header.css";

const Header = (props) => {
  return (
    <div id="header-container">
      <VaraText {...props} />
      <div id="nav">
        {props.navItems.map(({ path, name }) => (
          <Link to={path}>
            <div className="nav-item">{name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
