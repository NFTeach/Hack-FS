import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "60px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const userType = [
  {
      key: "0",
      value: "Student",
  },
  {
      key: "1",
      value: "Educator",
  }
];

function MenuItems() {
  const { pathname } = useLocation();
  const [id, setId] = useState("0");
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if(!id) return null;
    const newSelected = userType.find((item) => item.key === id);
    setSelected(newSelected);
  }, [id])

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);
    setId(e.key)
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {userType.map((item) => (
        <Menu.Item key={item.key} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  if (!id) return null;

  if(selected.key == 0) {
    console.log("true")
  }
  // console.log(selected.key)

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
      <Menu.Item>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          key={selected?.key}
          style={{ ...styles.button, ...styles.item }}
          >
          <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
      </Menu.Item>
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
