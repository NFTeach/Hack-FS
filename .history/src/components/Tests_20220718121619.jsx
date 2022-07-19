import React from 'react';
import Test from './Test';
import "../css/Tests.css";
import RightTestBar from './RightTestBar';

const Tests = () => {

  return (
    <>
      <div className="page">
        <div className="mainwindow">
          <div className="testContent">
            <Test />
          </div>
          <div className="rightBar">
            <RightTestBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tests
