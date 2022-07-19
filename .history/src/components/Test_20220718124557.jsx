import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Tests.css";
import "../css/Profile.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Test = () => {

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
                            <div className="testTitle">
                                {e.attributes.testName}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )
        }).reverse()}
        </>
    )
}

export default Test
