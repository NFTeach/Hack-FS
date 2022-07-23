import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router";
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

const EducatorMenuItems = () => {
  return (
    <>
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
      >
        <Menu.Item key="/edudash">
          <NavLink to="/edudash">😀 Educator Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="/uploadcontent">
          <NavLink to="/uploadcontent">⬆️ Create Course</NavLink>
        </Menu.Item>
        <Menu.Item key="/createtest">
          <NavLink to="/createtest">🧠 Create Test</NavLink>
        </Menu.Item>
        <Redirect to="/edudash" />
      </Menu>
    </>
  );
};

export default EducatorMenuItems;
