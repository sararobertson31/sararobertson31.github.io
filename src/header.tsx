import { Link } from "react-router-dom";

interface HeaderProps {
  navItems: Array<{ path: string; name: string }>;
  title: string;
}

const Header = (props: HeaderProps) => {
  return (
    <div id="header-container">
      <h1>{props.title}</h1>
      <div id="nav">
        {props.navItems.map(({ path, name }) => (
          <Link to={path}>{name}</Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
