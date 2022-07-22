import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Course.css";
import { Card, Popover } from "antd";
import { QuestionOutlined, CheckSquareOutlined } from "@ant-design/icons";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const displayCourseDetails = () => {
  console.log("here");
};

const { Meta } = Card;

const Content = () => {
  const { Moralis } = useMoralis();
  const [courseArr, setCourseArr] = useState([]);

  useEffect(() => {
    async function getCourses() {
      try {
        const Courses = Moralis.Object.extend("Course");
        const query = new Moralis.Query(Courses);
        const results = await query.find();
        console.log(results);
        setCourseArr(results.reverse());
        // setTestArr(results);
      } catch (error) {
        console.log(error);
      }
    }
    getCourses();
  }, []);

  return (
    <div className='courseContentPage'>
      {courseArr
        .map((e) => {
          console.log(e);
          return (
            <div>
              <Card
                className='courseCard'
                cover={
                  <img
                    alt='example'
                    src='https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
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
                      onClick={{
                        pathname: "/test",
                        state: { testData: { e } },
                      }}
                    />
                  </Popover>,
                ]}
              >
                <Meta
                  title={`Course Name: ${e.attributes.courseName}`}
                  description={"By:"}
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
