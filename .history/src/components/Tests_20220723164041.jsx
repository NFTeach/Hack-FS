import React from "react";
import TestCatalog from "./TestCatalog";
import "../css/Tests.css";

const Tests = () => {
  return (
    <>
      <div className='page'>
        <div className='mainwindow'>
          <div className='testContent'>
            <TestCatalog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tests;
