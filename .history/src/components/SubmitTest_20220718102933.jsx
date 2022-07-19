import React from 'react';
import { 
    Card, 
    Button
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';
import { useMoralis } from 'react-moralis';
import moralis from "moralis";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

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
        <li>
            <strong>{key}:</strong> {value}
        </li>
    ));
    
    console.log(data.Name)
    const { Moralis } = useMoralis();
    const user = moralis.User.current();
    // console.log(user)

    async function saveTest() {
        let link;
        if (data) {
            const file = new Moralis.File("file.json", {base64: btoa(JSON.stringify(data))});
            link = await file.saveIPFS();
        } else {
            link = "No data"
        }
        console.log(link._ipfs)
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
                        onClick={saveTest}
                    >
                        Submit Q&A's
                    </Button> 
                </Card>
            </main>
        </div>
    )
}

export default SubmitTest