import React, { useEffect, useState } from 'react';
import EduProfile from "./EduProfile";
// import {
//   CheckCircleOutlined,
//   AreaChartOutlined,
//   StarOutlined,
//   BorderOutlined,
// } from "@ant-design/icons";
import { Card, Table, notification, Button } from "antd";
import moralis from "moralis";
import { 
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall
} from 'react-moralis';
import { CONTRACT_ADDRESS } from './consts/vars';
import { NFTEACH_CONTRACT_ABI } from './consts/contractABIs';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

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
const tableData = [];

for (let i = 0; i < 46; i++) {
  tableData.push({
    key: i,
    name: `Vitalik Buterin ${i}`,
    course: `Cryptocurrency ${i}`,
  });
}
// console.log(tableData)

const EduDash = () => {

  const { Moralis } = useMoralis();
  const { native } = useMoralisWeb3Api();
  const user = moralis.User.current();
  const [testsPublished, setTestsPublished] = useState({});
  const [lifetimeEthRevenue, setLifetimeEthRevenue] = useState("");

  const options = {
    chain: "goerli",
    address: CONTRACT_ADDRESS,
    function_name: "getEducatorCurrentPayout",
    abi: NFTEACH_CONTRACT_ABI,
    params: {
      _educator: user.attributes.accounts[0],
    }
  }

  const {
    data,
    error,
    fetch,
    isLoading
  } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    {...options}
  );

  useEffect(() => {
    async function getTestsPublished() {
      try {
        const Tests = Moralis.Object.extend("Tests");
        const testQuery = new Moralis.Query(Tests);
        testQuery.equalTo("educatorAcc", user.attributes.accounts[0]);
        const educatorTests = await testQuery.find();
        setTestsPublished(educatorTests.length);
      } catch(error) {
        console.log(error)
      }
    }
    getTestsPublished(); 
  }, [])

  useEffect(() => {
    async function getEthRevenue() {
      try {
        const Withdrawal = Moralis.Object.extend("Withdrawal");
        const revenueQuery = new Moralis.Query(Withdrawal);
        // revenueQuery.equalTo("address", user.attributes.accounts[0]);
        const withdrawals = await revenueQuery.find();
        // console.log(withdrawals)
        let tableWithdrawals = [];
        const initialValue = 0;
        for (let i = 0; i < withdrawals.length; i++) {
          tableWithdrawals.push(
            Number(withdrawals[i].attributes.amount_decimal.value.$numberDecimal)
          );
        }
        // console.log(tableWithdrawals)
        const sumWithdrawals = tableWithdrawals.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          initialValue
        )
        // console.log(sumWithdrawals)
        setLifetimeEthRevenue(sumWithdrawals)
      } catch(error) {
        console.log(error)
      }
    }
    getEthRevenue();
  }, [])

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
          title='Tests Published'
          size='large'
        >
          <p>{`${testsPublished}`}</p>
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
          title='NFTeach Registered Students'
          size='large'
        >
          <p>Coming soon!</p>
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
          title='Your Students'
          size='large'
        >
          <p>Coming soon!</p>
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
          title='Lifetime Eth Revenue (Eth)'
          size='large'
        >
          {Moralis.Units.FromWei(lifetimeEthRevenue)}
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
          title='Payout available (ETH):'
          size='large'
        >
          <Button
            block
            onClick={() => {
              fetch({ params: options });
            }}
          >
            Check payout amount!
            <br/>
            <br/>
            {data && <pre>{Moralis.Units.FromWei(data)}</pre>}
          </Button>
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
              size='medium'
              dataSource={tableData}
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
        <Card>
          <EduProfile />
        </Card>
        </div>
      </div>
    </div>
  );
};

export default EduDash;
