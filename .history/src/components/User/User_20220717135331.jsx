import React from 'react';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

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
    const [selected, setSelected] = useState();

    console.log("id", id);

    useEffect(() => {
        if(!id) return null;
        const newSelected = userType.find((item) => item.key === id);
        setSelected(newSelected);
        console.log("current key: ", id)
    }, [id])

    const handleMenuClick = (e) => {
        console.log("switch to: ", e.key);
        setId(e.key)
    }
    
    const menu = (
        <Menu onClick={handleMenuClick}>
            {userType.map((item) => (
                <Menu.item key={item.key} style={styles.item}>
                    <span style={{ marginLeft: "5px" }}>{item.value}</span>
                </Menu.item>
            ))}
        </Menu>
    )

    if (!id) return null;

    return (
        <div>
            <Dropdown overlay={menu} >
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
}

export default User;