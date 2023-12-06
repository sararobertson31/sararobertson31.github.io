import { Link } from "react-router-dom";
import VaraText from "../VaraText";
import "./header.css";

interface HeaderProps {
  navItems: Array<{ path: string; name: string }>;
  title: string;
}

const Header = (props: HeaderProps) => {
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
