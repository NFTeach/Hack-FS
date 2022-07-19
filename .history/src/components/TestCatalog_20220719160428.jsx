import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";
import "../css/Tests.css";
import "../css/Profile.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

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
                <form style={styles.container}>
                    <main style={styles.main}>
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
                                <Link 
                                    to={{
                                        pathname: "/test",
                                        state: {testData: {e}}
                                    }}
                                >
                                    Take the test!
                                </Link>
                            </div>
                        </div>
                    </main>
                </ form>
                </>
            )
        }).reverse()}
        </>
    )
}

export default TestCatalog;
