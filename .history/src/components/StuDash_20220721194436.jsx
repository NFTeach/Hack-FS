import { React, useState } from "react";
import StuProfile from "./StuProfile";
import {
  CheckCircleOutlined,
  AreaChartOutlined,
  StarOutlined,
  BorderOutlined,
} from "@ant-design/icons";

import { Card, Space, Progress, Image } from "antd";

const StuDash = () => {
  return (
    <div>
      <div
        id='full'
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          fontWeight: "bolder",
        }}
      >
        <div
          id='toprow'
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "5px",
          }}
        >
          <Card
            headStyle={{
              background: "#21bf96",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            bodyStyle={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "1.5em",
              whiteSpace: "nowrap",
            }}
            style={{
              width: "100%",
              boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
              border: "1px solid #e7eaf3",
              margin: "5px",
            }}
            title='Courses Taken'
            size='large'
          >
            <p>
              7 Courses Taken <AreaChartOutlined />
            </p>
          </Card>
          <Card
            headStyle={{
              background: "#21bf96",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            bodyStyle={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "1.5em",
              whiteSpace: "nowrap",
            }}
            style={{
              width: "100%",
              boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
              border: "1px solid #e7eaf3",
              margin: "5px",
            }}
            title='Courses Passed'
            size='large'
          >
            <p>
              5 Courses Passed <CheckCircleOutlined />
            </p>
          </Card>

          <Card
            headStyle={{
              background: "#21bf96",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            bodyStyle={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "1.5em",
              whiteSpace: "nowrap",
            }}
            style={{
              width: "100%",
              alignItems: "center",
              margin: "5px",
            }}
            title='Course In Progress: Chemistry 101'
            size='large'
          >
            <Progress percent={75} />
          </Card>
        </div>
        <div
          id='secondrow'
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            margin: "5px",
          }}
        >
          <div
            id='left section'
            style={{
              display: "flex",
              width: "50%",
            }}
          >
            <div id='left column' style={{}}>
              <Card
                headStyle={{
                  background: "#21bf96",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                style={{
                  boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                  border: "1px solid #e7eaf3",
                  margin: "5px",
                }}
                title='SBTs Received '
                size='large'
              >
                <p>
                  5 SBTs Received <StarOutlined />
                </p>
              </Card>
              <Card
                headStyle={{
                  background: "#21bf96",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                bodyStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}
                style={{
                  boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                  border: "1px solid #e7eaf3",
                  margin: "5px",
                }}
                title='Latest NFT'
                icon={<BorderOutlined />}
                size='large'
              >
                <p>From MetaMask Wallet</p>

                <Image style={{ width: "12em", height: "12em" }} src='' />
              </Card>
            </div>

            <div id='inner column' style={{}}>
              <Card
                headStyle={{
                  background: "#21bf96",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                bodyStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}
                style={{
                  boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                  border: "1px solid #e7eaf3",
                  margin: "5px",
                }}
                title='Improvement (CS) '
                size='large'
              >
                <p>Improve in these areas</p>
              </Card>
              <Card
                headStyle={{
                  background: "#21bf96",
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                bodyStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}
                style={{
                  boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                  border: "1px solid #e7eaf3",
                  margin: "5px",
                }}
                title='Most Popular NFT'
                icon={<BorderOutlined />}
                size='large'
              >
                <p>coming soon!</p>
                <Image style={{ width: "12em", height: "12em" }} src='' />
              </Card>
            </div>
          </div>
          <div
            style={{
              borderRadius: "0.5rem",
              width: "70%",
              margin: "5px",
              background: "white",
            }}
          >
            <StuProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuDash;
