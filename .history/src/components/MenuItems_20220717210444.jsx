import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems({selected}) {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/uploadcontent">
        <NavLink to="/uploadcontent">⬆️ Upload Content</NavLink>
      </Menu.Item>
      <Menu.Item key="/content">
        <NavLink to="/content">📚 Content</NavLink>
      </Menu.Item>
      <Menu.Item key="/createtest">
        <NavLink to="/createtest">🧠 Create Test</NavLink>
      </Menu.Item>
      <Menu.Item key="/tests">
        <NavLink to="/tests">📝 Tests</NavLink>
      </Menu.Item>
      <Menu.Item key="/profile">
        <NavLink to="/profile">😀 Profile</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
