import { useState } from "react";
import Menu from "./Menu";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  return (<>
  <div className="navbar">
    <div className="title">Matcha</div>
    {menu && <Menu />}
    </div></>);
};

export default NavBar;
