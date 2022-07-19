import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button,
    List
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import { useMoralis } from 'react-moralis';
import moralis from "moralis";

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

    const [isTestSaving, setIsTestSaving] = useState(false);
    const [formattedData, setFormattedData] = useState({});
    // console.log(user)

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
                question: "What kind of dog keeps the best time?",
                answer: "Watchdog",
                variants: [`Watchdog`, `hotdog`, `Cutedog`, 'Fundog']
              },
          
              {
                id: "2",
                question:
                  "What time of day, when written in a capital letters, is the same forwards, backwards and upside down?",
                answer: "Noon",
                variants: [`Morning`, `Noon`, `Evening`, 'Midnight']
              },
            
              {
                id: "3",
                question: "What has a face and two hands but no arms or legs?",
                answer: "Clock",
                variants: [`Clock`, `Watch`, `Person`, 'Cat']
              },
          
              {
                id: "4",
                question:
                  "What five-letter word becomes shorter when you add two letters to it?",
                answer: "Short",
                variants: [`Long`, `Short`, `Little`, 'Huge']
              },
            
              {
                id: "5",
                question: "What has a neck but no head?",
                answer: "Bottle",
                variants: [`Pan`, `Bottle`, `Plate`, 'Bowl']
              },
            
              {
                id: "6",
                question:
                  "What starts with a 'P', ends with an 'E' and has thousands of letters?",
                answer: "Post Office",
                variants: [`Letter`, `Envelope`, `Post Office`, 'Parchment']
              }, 
          
              {
                id: "7",
                question: "What has to be broken before you can eat it?",
                answer: "Egg",
                variants: [`Bread`, `Banana`, `Egg`, 'Banana']
              },
          
              {
                id: "8",
                question: "What begins with T, ends with T and has T in it?",
                answer: "Teapot",
                variants: [`Teapot`, `Teacup`, `Teatree`, 'Tweet']
              },
          
              {
                id: "9",
                question: "Teddy bears are never hungry because they are always what?",
                answer: "Stuffed",
                variants: [`Full`, `Stuffed`, `Sleep`, 'Tired']
              },
        ]
        setFormattedData(dataFormatted)
    },[])
    console.log(formattedData)

    async function saveTest() {
        let link;
        if (data) {
            const file = new Moralis.File("file.json", {base64: btoa(JSON.stringify(data))});
            link = await file.saveIPFS();
        } else {
            link = "No data"
        }
        // console.log(link._ipfs)
        if(!link._ipfs) return;

        const Tests = moralis.Object.extend("Tests");

        const newTest = new Tests();

        newTest.set("testData", link._ipfs)
        newTest.set("testName", data.Name)
        newTest.set("educatorName", data.Educator)
        newTest.set("testCategory", data.Category)
        newTest.set("testDifficulty", data.Difficulty)
        newTest.set("educatorAcc", user?.attributes.ethAddress)
        newTest.set("educatorPfp", user?.attributes.pfp)
        newTest.set("educatorUsername", user?.attributes.username)

        await newTest.save();

        // NEED TO ADD CONTRACT INTERACTION HERE
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
                        loading={isTestSaving}
                        onClick={async () => {
                            setIsTestSaving(true);
                            await saveTest();
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