import { React, useState, useEffect } from "react";
import StuProfile from "./StuProfile";
import {
  CheckCircleOutlined,
  AreaChartOutlined,
  StarOutlined,
  BorderOutlined,
} from "@ant-design/icons";

import { Card, notification, Progress, Image } from "antd";
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

const StuDash = () => {
  const { Moralis } = useMoralis();
  const { native } = useMoralisWeb3Api();
  const user = moralis.User.current();

  const [registeredEducators, setRegisteredEducators] = useState("0");
  const [userTestsPassed, setUserTestsPassed] = useState("0");

  useEffect(() => {
    async function getRegisteredEducators() {
      try {
        const Educators = Moralis.Object.extend("Educators");
        const educatorQuery = new Moralis.Query(Educators);
        const educators = await educatorQuery.find();
        setRegisteredEducators(educators.length)
      } catch (error) {
        console.log(error)
      }
    }
    getRegisteredEducators();
  },[])

  useEffect(() => {
    async function getUserTestsPassed() {
      try {
        const ValidatedTests = Moralis.Object.extend("ValidateTest");
        const validateTestsQuery = new Moralis.Query(ValidatedTests);
        validateTestsQuery.equalTo("student", user.attributes.accounts[0]);
        const validatedTests = await validateTestsQuery.find();
        setUserTestsPassed(validatedTests.length)
      }
    }
  })

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
            title='NFTeach Registered Educators'
            size='large'
          >
            <p>{`${registeredEducators}`}</p>
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
            title='Tests Passed'
            size='large'
          >
            <p>
            {`Tests Passed: ${userTestsPassed}`} <CheckCircleOutlined />
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
            title='SBTs Receieved'
            size='large'
          >
            {/* <Progress percent={75} /> */}

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
              width: "100%",
            }}
          >
            <div id='left column' style={{}}>
              {/* <Card
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
              </Card> */}
            </div>

            <div id='inner column' style={{}}>
              {/* <Card
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
              </Card> */}
            </div>
          </div>
          <div
            style={{
              borderRadius: "0rem",
              width: "100%",
              margin: "5px",
              background: "white",
            }}
          >
            <Card>
              <StuProfile />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuDash;
