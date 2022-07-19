import React from 'react';
import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { createSlice } from "@reduxjs/toolkit";

const styles = {
    item: {
      display: "flex",
      alignItems: "center",
      height: "42px",
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


function User() {
    const [id, setId] = useState("0");
    const [selected, setSelected] = useState({});

    useEffect(() => {
        if(!id) return null;
        const newSelected = userType.find((item) => item.key === id);
        setSelected(newSelected);
    }, [id])

    // console.log(selected)

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

    export const userSlice = createSlice({
        name: "user",
        initialState: {
            count: 0
        },
        reducers: {
            changeUser: (selected) => {
                selected;
            }
        }
    })

    return (
        <div>
            <Dropdown overlay={menu} trigger={["click"]}>
                <Button
                    key={selected?.key}
                    style={{ ...styles.button, ...styles.item }}
                    >
                    <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
                    <DownOutlined />
                </Button>
            </Dropdown>
        </div>
    );
};

export default User;