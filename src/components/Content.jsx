import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Course.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const displayCourseDetails = () => {
  console.log("here");
};

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
    <div className="courseContentPage">
      {courseArr
        .map((e) => {
          console.log(e);
          return (
            <div>
              <div className="courseCard">
                <div className="courseName">{e.attributes.courseName}</div>
                <div className="courseDescription">
                  Course Description:
                  <br />
                  {e.attributes.courseDescription}
                </div>
                <div className="courseDifficulty">
                  Course Difficulty: {e.attributes.courseDifficulty[0]}
                </div>
                <button
                  className="courseCardButton"
                  onClick={displayCourseDetails}
                >
                  See Course Details
                </button>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default Content;
