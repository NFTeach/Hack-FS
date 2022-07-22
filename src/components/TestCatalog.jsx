import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Tests.css";
import "../css/Profile.css";
import { Avatar, Card, Popover } from "antd";
import {
  ContainerOutlined,
  QuestionOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;
const { Meta } = Card;

const TestCatalog = () => {
  const styles = {
    title: {
      fontSize: "20px",
      fontWeight: "700",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "0.5rem",
      width: "50%",
      background: "white",
    },
    mobileCard: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "0.5rem",
      width: "100%",
    },
    container: {
      padding: "0 2rem",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
    },
    nextButton: {
      float: "right",
      marginTop: "10px",
    },
    backButton: {
      float: "left",
      marginTop: "10px",
    },
    text: {
      fontSize: "14px",
      alignSelf: "center",
    },
  };

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
              <p>{`${e.attributes.educatorAcc.slice(
                0,
                4
              )}...${e.attributes.educatorAcc.slice(38)} · 
                                    ${e.attributes.createdAt.toLocaleString(
                                      "en-us",
                                      { month: "short" }
                                    )}  
                                    ${e.attributes.createdAt.toLocaleString(
                                      "en-us",
                                      { day: "numeric" }
                                    )}
                                    `}</p>
            </div>
          );
          // console.log(e.id)
          return (
            <>
              <form style={styles.container}>
                <main style={styles.main}>
                  <div style={styles.wrapper}>
                    <div className='feedTests'>
                      <div className='completeTest'>
                        <Card
                          style={{
                            width: "500px",
                          }}
                          cover={
                            <img
                              alt='example'
                              src='https://images.unsplash.com/photo-1656998019066-002f27bbe342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80'
                            />
                          }
                          actions={[
                            <Popover content={content}>
                              <QuestionOutlined />
                            </Popover>,
                            <Popover content={takeTest}>
                              <ContainerOutlined
                                onClick={{
                                  pathname: "/test",
                                  state: { testData: { e } },
                                }}
                              />
                            </Popover>,
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
                  </div>
                </main>
              </form>
            </>
          );
        })
        .reverse()}
    </>
  );
};

export default TestCatalog;
