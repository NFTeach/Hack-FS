import React from 'react';
import TestCatalog from './TestCatalog';
import "../css/Tests.css";
import RightTestBar from './RightTestBar';

const Tests = () => {

  return (
    <>
      <div className="page">
        <div className="mainwindow">
          <div className="testContent">
            <TestCatalog />
          </div> 
        </div>
        {/* <div className="rightBar">
          <RightTestBar />
        </div> */}
      </div>
    </>
  )
}

export default Tests
