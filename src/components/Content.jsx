import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import moralis from "moralis";
import "../css/Course.css";
import { Card, Popover } from "antd";
import { QuestionOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { CONTRACT_ADDRESS } from "./consts/vars";
import { NFTEACH_CONTRACT_ABI } from "./consts/contractABIs";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const { Meta } = Card;

const Content = () => {
  const { Moralis } = useMoralis();
  const [courseArr, setCourseArr] = useState([]);
  const { fetch: executeContractFunction, isFetching } =
    useWeb3ExecuteFunction();

  async function getUserAvailability(prereq) {
    const user = Moralis.User.current();
    const userAddr = user.get("ethAddress");
    executeContractFunction({
      params: {
        abi: NFTEACH_CONTRACT_ABI,
        contractAddress: CONTRACT_ADDRESS,
        functionName: "balanceOf",
        params: {
          account: userAddr,
          id: 0,
        },
      },
      onSuccess: (result) => {
        if (result._hex == 0x00) {
          return false;
        } else {
          return true;
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  const displayCourseDetails = async (testTokenIdPrerequisites) => {
    if (testTokenIdPrerequisites == null) return true;
    else {
      const requisites = await getUserAvailability(testTokenIdPrerequisites);
      console.log(requisites);
      console.log("nowWeHere");
      // const Courses = Moralis.Object.extend("Courses");
      // console.log(Courses);
    }
  };

  useEffect(() => {
    async function getCourses() {
      try {
        const Courses = Moralis.Object.extend("Course");
        const query = new Moralis.Query(Courses);
        const results = await query.find();
        setCourseArr(results.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);

  return (
    <div className="courseContentPage">
      {courseArr
        .map((e) => {
          return (
            <div>
              <Card
                className="courseCard"
                cover={
                  <img
                    alt="example"
                    src="https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  />
                }
                actions={[
                  <Popover
                    content={
                      <div>
                        <p>
                          Course Difficulty:
                          <br />
                          {e.attributes.courseDifficulty[0]}
                        </p>
                        <p>
                          Course Description:
                          <br />
                          {e.attributes.courseDescription}
                        </p>
                      </div>
                    }
                  >
                    <QuestionOutlined />
                  </Popover>,
                  <Popover
                    content={
                      <div>
                        <p>Check Eligibility</p>
                      </div>
                    }
                  >
                    <CheckSquareOutlined
                      onClick={() =>
                        displayCourseDetails(e.attributes.coursePrerequisites)
                      }
                    />
                  </Popover>,
                ]}
              >
                <Meta
                  title={`Course Name: ${e.attributes.courseName}`}
                  description={`By: ${e.attributes.courseCreator}`}
                />
              </Card>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default Content;
