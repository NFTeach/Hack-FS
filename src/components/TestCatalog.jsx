import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Tests.css";
import "../css/Profile.css";
import { Button } from "antd";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

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
            } catch(error) {
                console.log(error)
            }
        }
        getTestInfo();
    }, []);

    // console.log(testArr)

    return (
        <>
        {testArr.map((e) => {
            // console.log(e.id)
            return (
                <>
                <div className="feedTests">
                    <img src={e.attributes.educatorPfp ? e.attributes.educatorPfp : defaultImgs[0]} className="profilePic"></img>
                    <div className="completeTest">
                        <div className="who">
                            {e.attributes.educatorUsername}
                            <div className="accWhen">
                            {
                            `${e.attributes.educatorAcc.slice(0, 4)}...${e.attributes.educatorAcc.slice(38)} · 
                            ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                            ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                            `  
                            }
                            </div>
                        </div>
                        <div className="testContent">
                            <div className="testName">
                            {
                                `Test name:  ${e.attributes.testName}`
                            }
                            </div>
                            <div className="testCategory">
                            {
                                `Test category: ${e.attributes.testCategory}`
                            }
                            </div>
                            <div className="testDifficulty">
                            {
                                `Test Difficulty: ${e.attributes.testDifficulty}`
                            }
                            </div>
                            <div className="educatorName">
                            {
                                `Educator Name: ${e.attributes.educatorName}`
                            }
                            </div>
                        </div>
                        
                        <Button
                            type="primary"
                            // onClick={}
                        >
                            Take the Test!
                        </Button>
                    </div>
                </div>
                </>
            )
        }).reverse()}
        </>
    )
}

export default TestCatalog
