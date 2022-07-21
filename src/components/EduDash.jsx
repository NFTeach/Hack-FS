import { React } from "react";
import Profile from "./Profile";
import {
  CheckCircleOutlined,
  AreaChartOutlined,
  StarOutlined,
  BorderOutlined,
} from "@ant-design/icons";

import { Card, Table } from "antd";

const columns = [
  {
    title: "Student Name",
    dataIndex: "name",
  },

  {
    title: "Course",
    dataIndex: "course",
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Vitalik Buterin ${i}`,
    course: `Cryptocurrency ${i}`,
  });
}

const EduDash = () => {
  return (
    <div>
      <div
        id='firstrow'
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
          title='Courses Published '
          size='large'
        >
          <p>7 Courses Taken</p>
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
            fontSize: "2em",
            whiteSpace: "nowrap",
          }}
          style={{
            width: "100%",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            margin: "5px",
          }}
          title='Active Students'
          size='large'
        >
          <p>5,335</p>
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
            fontSize: "2em",
            whiteSpace: "nowrap",
            flexDirection: "row",
          }}
          style={{
            width: "100%",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            margin: "5px",
          }}
          title='Total Students'
          size='large'
        >
          <p>7642</p>
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
            alignItems: "center",
            justifyContent: "center",
          }}
          title='Fiat Revenue ($)'
          size='large'
        >
          <h1>14, 204.19k</h1>
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
          }}
          style={{
            width: "100%",
            alignItems: "center",
            margin: "5px",
          }}
          title='Crypto Revenue (ETH):'
          size='large'
        >
          <h1>7.20</h1>
        </Card>
      </div>

      <div
        id='secondrow'
        style={{
          display: "flex",
          width: "100%",
          margin: "5px",
        }}
      >
        <div
          id='left section'
          style={{
            width: "100%",
          }}
        >
          <div id='table' style={{}}>
            <Table
              size='large'
              dataSource={data}
              columns={columns}
              style={{
                boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
                border: "2px solid #e7eaf3",
                background: "#21bf96",
              }}
            />
          </div>
        </div>
        <div
          style={{
            borderRadius: "0.5rem",
            width: "40%",
            margin: "10px",
            background: "white",
          }}
        >
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default EduDash;
