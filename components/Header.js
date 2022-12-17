import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return(
  <Menu style = {{ marginTop: '10px' }}>
    <Link route="/">
      <a className="item">
        Smart Gym(Top)
      </a>
    </Link>
    <Menu.Menu position="right">
    <Link route="/machinevideo">
      <a className="item">Machine Video List</a>
    </Link>
      <Link route="/">
        <a className="item">Account List</a>
      </Link>
    </Menu.Menu>
  </Menu>
)};

export default Header;
