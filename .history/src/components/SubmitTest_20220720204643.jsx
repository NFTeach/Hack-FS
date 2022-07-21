import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button,
    List,
    Modal,
    notification
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import { 
    useMoralis,
    useMoralisFile,
    useWeb3ExecuteFunction
 } from 'react-moralis';
import moralis from "moralis";
import { CONTRACT_ADDRESS } from "./consts/vars";
import { NFTEACH_CONTRACT_ABI } from "./consts/contractABIs";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const SubmitTest = (props) => {
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
        backButton: {
            float: "left",
            marginTop: "10px",
        },
        submitButton: {
            float: "right",
            marginTop: "10px",
        },
    };

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    const { testData, back } = props;
    const listItems = Object.entries(testData).map(([key, value]) => (
        <List>
            <List.Item key={key}>
                <List.Item.Meta
                title={key} 
                description={value} />
            </List.Item>
        </List>
    ));
    
    const { 
        Moralis,
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading 
    } = useMoralis();
    const user = moralis.User.current();
    const { error, saveFile } = useMoralisFile();

    const [formattedData, setFormattedData] = useState({});
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);

    const {
        data,
        error: executeContractError,
        fetch: executeContractFunction,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        const dataFormatted = [
            {
                id: "0",
                question: testData.Question_1,
                answer: testData.Answer_1,
                variants: [
                    testData.Question_1_False_Answer_1, 
                    testData.Question_1_False_Answer_2, 
                    testData.Question_1_False_Answer_3, 
                    testData.Answer_1
                ]
            },
            {
                id: "1",
                question: testData.Question_2,
                answer: testData.Answer_2,
                variants: [
                    testData.Question_2_False_Answer_1,
                    testData.Answer_2, 
                    testData.Question_2_False_Answer_2, 
                    testData.Question_2_False_Answer_3, 
                ]
            },
            {
                id: "2",
                question: testData.Question_3,
                answer: testData.Answer_3,
                variants: [
                    testData.Question_3_False_Answer_1,
                    testData.Question_3_False_Answer_2,
                    testData.Answer_3,  
                    testData.Question_3_False_Answer_3, 
                ]
            },
            {
                id: "3",
                question: testData.Question_4,
                answer: testData.Answer_4,
                variants: [
                    testData.Question_4_False_Answer_1,
                    testData.Answer_4,
                    testData.Question_4_False_Answer_2,
                    testData.Question_4_False_Answer_3, 
                ]
            },
            {
                id: "4",
                question: testData.Question_5,
                answer: testData.Answer_5,
                variants: [
                    testData.Question_5_False_Answer_1,
                    testData.Question_5_False_Answer_2,  
                    testData.Question_5_False_Answer_3,
                    testData.Answer_5, 
                ]
            },
            {
                id: "5",
                question: testData.Question_6,
                answer: testData.Answer_6,
                variants: [
                    testData.Answer_6,
                    testData.Question_6_False_Answer_1,
                    testData.Question_6_False_Answer_2,
                    testData.Question_6_False_Answer_3, 
                ]
            },
            {
                id: "6",
                question: testData.Question_7,
                answer: testData.Answer_7,
                variants: [
                    testData.Question_7_False_Answer_1,
                    testData.Question_7_False_Answer_2,
                    testData.Answer_7,  
                    testData.Question_7_False_Answer_3, 
                ]
            },
            {
                id: "7",
                question: testData.Question_8,
                answer: testData.Answer_8,
                variants: [
                    testData.Question_8_False_Answer_1,
                    testData.Question_8_False_Answer_2,
                    testData.Question_8_False_Answer_3,
                    testData.Answer_8, 
                ]
            },
            {
                id: "8",
                question: testData.Question_9,
                answer: testData.Answer_9,
                variants: [
                    testData.Question_9_False_Answer_1,
                    testData.Question_9_False_Answer_2,
                    testData.Answer_9,  
                    testData.Question_9_False_Answer_3, 
                ]
            },
            {
                id: "9",
                question: testData.Question_10,
                answer: testData.Answer_10,
                variants: [
                    testData.Answer_10,
                    testData.Question_10_False_Answer_1,
                    testData.Question_10_False_Answer_2, 
                    testData.Question_10_False_Answer_3, 
                ]
            },
        ]
        setFormattedData(dataFormatted)
    },[])
    console.log(data)

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            setIsUploadInProgress(false);

            Modal.success({
                title: "Congrats! Your test has been created!",
                content: (
                    <div>
                        <p>
                            <b>Title:</b> {testData.Name}
                        </p>
                        <p>
                            <b>Category:</b> {testData.Category}
                        </p>
                        <p>
                            <b>Educator:</b> {testData.Educator}
                        </p>
                        <p>
                            <b>Difficulty:</b> {testData.Difficulty}
                        </p>
                        <p>
                            <b>PassingGrade:</b> {testData.PassingGrade}
                        </p>
                    </div>
                ),
                onOk() {
                    setFormattedData({});
                    window.location.reload();
                }
            });
        }
    }, [isFetching, isLoading]);

    //ADD CHECK THAT EDUCATOR INPUTTED ALL REQUIRED FIELDS (NOT TOTALLY SURE HOW TO DO THIS YET)

    useEffect(() => {
        if (executeContractError && executeContractError.code === 4001) {
            setIsUploadInProgress(false);
            notification.error({
                message: "NFT Mint Error",
                description: executeContractError.message,
            });
        }
    }, [executeContractError]);

    const uploadTestToIpfsAndSetTokenMetadata = async () => {
        // FIX THIS WHEN ADD CHECK ABOVE FOR PROPER INPUTS
        // if(!isInputValid) {
        //     window.alert("Not all fields filled in! Please fill in all fields and then re-submit.")
        //     setIsNftMintInProcess(false);
        //     return
        // }

        if (isAuthenticated) {
            notification.info({
                message: "Uploading in progress",
                description: "Your test is being upload to IPFS and data stored on the smart contract. PLEASE DON'T REFRESH PAGE!"
            })
        
            let link;
            if (formattedData) {
                const dataFile = formattedData;
                const file = new Moralis.File("file.json", {base64: btoa(JSON.stringify(dataFile))});
                link = await file.saveIPFS();
            } else {
                link = "No data"
            }
            // console.log(link._ipfs)
            if (error) {
                console.error("Error uploading test to IPFS");
            }

            const tokenMetadataObj = {
                name: testData.Name,
                test: link,
                attributes: [
                    { 
                        category: testData.Category,
                        educator: testData.Educator,
                        difficulty: testData.Difficulty,
                        passingGrade: testData.PassingGrade
                    }
                ],
            };

            const tokenMetadata = await saveFile(
                `${testData.Name.replace(/\s/g, "")}.json`,
                { base64: btoa(JSON.stringify(tokenMetadataObj)) },
                {
                    type: "application/json",
                    saveIPFS: true,
                }
            )
            
            async function saveTest() {
            
                const Tests = moralis.Object.extend("Tests");
                const query = new Moralis.Query(Tests);
                const results = await query.find()
                const tokenId = results.length + 1;
        
                const newTest = new Tests();
                
                newTest.set("tokenId", tokenId)
                newTest.set("testData", link._ipfs)
                newTest.set("testName", testData.Name)
                newTest.set("educatorName", testData.Educator)
                newTest.set("testCategory", testData.Category)
                newTest.set("testDifficulty", testData.Difficulty)
                newTest.set("passingGrade", testData.PassingGrade)
                newTest.set("educatorAcc", user?.attributes.ethAddress)
                newTest.set("educatorPfp", user?.attributes.pfp)
                newTest.set("educatorUsername", user?.attributes.username)
        
                await newTest.save();   
            }

            executeContractFunction({
                params: {
                    abi: NFTEACH_CONTRACT_ABI,
                    contractAddress: CONTRACT_ADDRESS,
                    functionName: "createSBT",
                    params: {
                        _price: Moralis.Units.ETH(testData.Price), 
                        _testHash: tokenMetadata._ipfs,
                    },
                },
                onSuccess: () => {
                    saveTest();
                },
                onError: (error) => {
                    notification.error({
                        message: error,
                        // description: "Please try again and make sure you are using a valid educator wallet address"
                    })
                }
            });
        } else {
            setIsUploadInProgress(false);
            notification.error({
                message: "You need to have your wallet connected to create a test",
                description: "In order to use this feature, you have to connect your wallet."
            });
        }
    }

    if(error) {
        notification.error({
            message: "Error",
            description: "Please try again and make sure you are using a valid educator wallet address"
        })
        setIsUploadInProgress(false);
    }


  return (
        <div style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test (10 Questions)"}
                >
                    <ul>{listItems}</ul>
                    <Button
                        style={styles.backButton}
                        type="primary"
                        onClick={back}
                    >
                        Previous Question
                    </Button>
                    <Button
                        style={styles.submitButton}
                        type="primary"
                        loading={isUploadInProgress}
                        onClick={async () => {
                            setIsUploadInProgress(true);
                            await uploadTestToIpfsAndSetTokenMetadata();
                        }}
                    >
                        Submit Q&A's
                    </Button> 
                </Card>
            </main>
        </div>
    )
}

export default SubmitTest