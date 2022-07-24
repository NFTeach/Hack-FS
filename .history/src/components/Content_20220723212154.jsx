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

  const [details, setDetails] = useState(null);
  const [allowedGated, setAllowGated] = useState(null);

  async function getUserAvailability(prereq) {
    if (prereq === -1) {
      setAllowGated(true);
    } else {
      const user = Moralis.User.current();
      const userAddr = user.get("ethAddress");
      executeContractFunction({
        params: {
          abi: NFTEACH_CONTRACT_ABI,
          contractAddress: CONTRACT_ADDRESS,
          functionName: "balanceOf",
          params: {
            account: userAddr,
            id: prereq,
          },
        },
        onSuccess: (result) => {
          console.log(result);
          if (result._hex == 0x01) {
            setAllowGated(true);
          } else {
            setAllowGated(false);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  }

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

  console.log(courseArr)
  return (
    <div>
      {details && (
        <Card className="courseDetails">
          <div className="courseDetailsName">
            {" "}
            {details.attributes.courseName}
          </div>
          Required level: {details.attributes.courseDifficulty}
          <br />
          Study time: {details.attributes.courseLength}
          <br />
          <div className="courseDetailsDescription">
            Course description: {details.attributes.courseDescription}
          </div>
          <div> Course subject: {details.attributes.courseSubject}</div>
          <div> Course Creator Address: {details.attributes.courseCreator}</div>
          <div className="courseDetailsButton">
            <button onClick={() => setDetails(null)}>Close Details</button>
            {allowedGated && <a href={details.attributes.courseFile} target="_blank"><button>Course Material</button></a>}
            {!allowedGated && <button>Can't access material yet!</button>}
          </div>
        </Card>
      )}
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
                      src={e.attributes.imageFile}
                    />
                  }
                  actions={[
                    <Popover
                      content={
                        <div>
                          <p>
                            Course Difficulty:
                            <br />
                            {e.attributes.courseDifficulty}
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
                          <p>See Course Details</p>
                        </div>
                      }
                    >
                      <CheckSquareOutlined
                        onClick={
                          () => {
                            setDetails(e);
                            getUserAvailability(
                              e.attributes.testTokenIdPrerequisites
                            );
                          }
                          // displayCourseDetails(
                          //   e.attributes.testTokenIdPrerequisites
                          // )
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
    </div>
  );
};

export default Content;
