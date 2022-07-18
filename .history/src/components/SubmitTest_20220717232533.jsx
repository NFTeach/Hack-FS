import React from 'react';
import { 
    Card, 
    Button
} from 'antd';
import useWindowDimensions from '../util/useWindowDimensions';

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
    // console.log(data)
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
                        // onClick={next}
                    >
                        Submit Q&A's
                    </Button> 
                </Card>
            </main>
        </div>
    )
}

export default SubmitTest