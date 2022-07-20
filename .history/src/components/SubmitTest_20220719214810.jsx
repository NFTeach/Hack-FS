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

    const { data, back } = props;
    const listItems = Object.entries(data).map(([key, value]) => (
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
    const [file, setFile] = useState(null);
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);

    const {
        dataFormatted,
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
                question: data.Question_1,
                answer: data.Answer_1,
                variants: [
                    data.Question_1_False_Answer_1, 
                    data.Question_1_False_Answer_2, 
                    data.Question_1_False_Answer_3, 
                    data.Answer_1
                ]
            },
            {
                id: "1",
                question: data.Question_2,
                answer: data.Answer_2,
                variants: [
                    data.Question_2_False_Answer_1,
                    data.Answer_2, 
                    data.Question_2_False_Answer_2, 
                    data.Question_2_False_Answer_3, 
                ]
            },
            {
                id: "2",
                question: data.Question_3,
                answer: data.Answer_3,
                variants: [
                    data.Question_3_False_Answer_1,
                    data.Question_3_False_Answer_2,
                    data.Answer_3,  
                    data.Question_3_False_Answer_3, 
                ]
            },
            {
                id: "3",
                question: data.Question_4,
                answer: data.Answer_4,
                variants: [
                    data.Question_4_False_Answer_1,
                    data.Answer_4,
                    data.Question_4_False_Answer_2,
                    data.Question_4_False_Answer_3, 
                ]
            },
            {
                id: "4",
                question: data.Question_5,
                answer: data.Answer_5,
                variants: [
                    data.Question_5_False_Answer_1,
                    data.Question_5_False_Answer_2,  
                    data.Question_5_False_Answer_3,
                    data.Answer_5, 
                ]
            },
            {
                id: "5",
                question: data.Question_6,
                answer: data.Answer_6,
                variants: [
                    data.Answer_6,
                    data.Question_6_False_Answer_1,
                    data.Question_6_False_Answer_2,
                    data.Question_6_False_Answer_3, 
                ]
            },
            {
                id: "6",
                question: data.Question_7,
                answer: data.Answer_7,
                variants: [
                    data.Question_7_False_Answer_1,
                    data.Question_7_False_Answer_2,
                    data.Answer_7,  
                    data.Question_7_False_Answer_3, 
                ]
            },
            {
                id: "7",
                question: data.Question_8,
                answer: data.Answer_8,
                variants: [
                    data.Question_8_False_Answer_1,
                    data.Question_8_False_Answer_2,
                    data.Question_8_False_Answer_3,
                    data.Answer_8, 
                ]
            },
            {
                id: "8",
                question: data.Question_9,
                answer: data.Answer_9,
                variants: [
                    data.Question_9_False_Answer_1,
                    data.Question_9_False_Answer_2,
                    data.Answer_9,  
                    data.Question_9_False_Answer_3, 
                ]
            },
            {
                id: "9",
                question: data.Question_10,
                answer: data.Answer_10,
                variants: [
                    data.Answer_10,
                    data.Question_10_False_Answer_1,
                    data.Question_10_False_Answer_2, 
                    data.Question_10_False_Answer_3, 
                ]
            },
        ]
        setFormattedData(dataFormatted)
    },[])
    console.log(dataFormatted)

    useEffect(() => {
        if (!isLoading && !isFetching && dataFormatted) {
            setIsUploadInProgress(false);

            Modal.success({
                title: "Congrats! Your test has been created!",
                content: (
                    <div>
                        <p>
                            <b>Title:</b> {data.Name}
                        </p>
                        <p>
                            <b>Category:</b> {data.Category}
                        </p>
                        <p>
                            <b>Educator:</b> {data.Educator}
                        </p>
                        <p>
                            <b>Difficulty:</b> {data.Difficulty}
                        </p>
                        <p>
                            <b>PassingGrade:</b> {data.PassingGrade}
                        </p>
                    </div>
                ),
                onOk() {
                    setFormattedData({});
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
                const file = new Moralis.File("file.json", {base64: btoa(JSON.stringify(formattedData))});
                link = await file.saveIPFS();
            } else {
                link = "No data"
            }
            // console.log(link._ipfs)
            if (error) {
                console.error("Error uploading test to IPFS");
            }

            const tokenMetadataObj = {
                name: data.Name,
                test: link,
                attributes: [
                    { 
                        category: data.Category,
                        educator: data.Educator,
                        difficulty: data.Difficulty,
                        passingGrade: data.PassingGrade
                    }
                ],
            };

            const tokenMetadata = await saveFile(
                `${data.Name.replace(/\s/g, "")}.json`,
                { base64: btoa(JSON.stringify(tokenMetadataObj)) },
                {
                    type: "application/json",
                    saveIPFS: true,
                }
            )

            async function saveTest() {
            
                const Tests = moralis.Object.extend("Tests");
        
                const newTest = new Tests();
        
                newTest.set("testData", link._ipfs)
                newTest.set("testName", data.Name)
                newTest.set("educatorName", data.Educator)
                newTest.set("testCategory", data.Category)
                newTest.set("testDifficulty", data.Difficulty)
                newTest.set("passingGrade", data.PassingGrade)
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
                        _price: Moralis.Units.ETH(0.001), //NEED TO CHANGE THIS TO THE INPUTTED PRICE THAT THE EDUCATOR DESIRES
                        _testHash: tokenMetadata._ipfs,
                    },
                },
                onSuccess: () => {
                    saveTest();
                },
                onError: (error) => {
                console.log("ERROR")
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