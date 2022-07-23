import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Profile.css";
import "../css/Course.css";
import "../css/Tests.css";
import { Avatar, Card, Popover, Button } from "antd";
import {
  ContainerOutlined,
  QuestionOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;
const { Meta } = Card;

const TestCatalog = () => {
  const { Moralis } = useMoralis();
  const [testArr, setTestArr] = useState([]);

  useEffect(() => {
    async function getTestInfo() {
      try {
        const Tests = Moralis.Object.extend("Tests");
        const query = new Moralis.Query(Tests);
        const results = await query.find();
        setTestArr(results);
      } catch (error) {
        console.log(error);
      }
    }
    getTestInfo();
  }, []);


  // console.log(testArr)
  return (
    <>
      {testArr
        .map((e) => {
          const content = (
            <div>
              <p>{`Test Category: ${e.attributes.testCategory}`}</p>
              <p>{`Test Difficulty: ${e.attributes.testDifficulty}`}</p>
              <p>{`Passing Grade: ${e.attributes.passingGrade}`}</p>
            </div>
          );
          const takeTest = (
            <div>
              <p>Take the Test!</p>
            </div>
          );
          const who = (
            <div>
              <p>{`${e.attributes.educatorAcc.slice(0,4)}...${e.attributes.educatorAcc.slice(38)} · 
                ${e.attributes.createdAt.toLocaleString("en-us", { month: "short" } )}  
                ${e.attributes.createdAt.toLocaleString("en-us", { day: "numeric" } )}
                `}
              </p>
            </div>
          );
          // console.log(e.id)
          return (
            <>
              <div className='testsPage'>
                <div>
                  <Card
                    className='courseCard'
                    cover={
                      <img
                        alt='example'
                        src='https://images.unsplash.com/photo-1520004434532-668416a08753?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      />
                    }
                    actions={[
                      <Popover content={content}>
                        <QuestionOutlined />
                      </Popover>,
                      <Popover content={takeTest}>
                        <Link to={{
                          pathname: "/test",
                          state: {testData: {e}}
                        }}
                        >
                          <Button>
                            <ContainerOutlined />
                          </Button> 
                        </Link>
                      </Popover>,
                      // <Button
                      //   onClick={{
                      //     pathname: "/test",
                      //     state: { testData: { e } },
                      //   }}
                      // >
                      //   <ContainerOutlined />
                      // </Button>,
                      <Popover content={who}>
                        <EllipsisOutlined />
                      </Popover>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          src={
                            e.attributes.educatorPfp
                              ? e.attributes.educatorPfp
                              : defaultImgs[0]
                          }
                        />
                      }
                      title={`Test Name: ${e.attributes.testName}`}
                      description={`By: ${e.attributes.educatorName}`}
                    />
                  </Card>
                </div>
              </div>
            </>
          );
        })
        .reverse()}
    </>
  );
};

export default TestCatalog;