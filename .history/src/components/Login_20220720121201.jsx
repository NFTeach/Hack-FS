import React from 'react';
import useWindowDimensions from '../util/useWindowDimensions';

const Login = () => {
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
        studentButton: {
            float: "left",
            marginTop: "10px",
        },
        educatorButton: {
            float: "right",
            marginTop: "10px",
        },
    };

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Are you here to learn or teach?"}
                >
                    <Button
                        style={styles.educatorButton}
                        type="primary"
                        // loading={}
                        // onClick={async () => {
                            
                        // }}
                    >
                        Click here to register address as educator!
                    </Button>
                    <Button
                        style={styles.studentButton}
                        type="primary"
                        // loading={}
                        // onClick={async () => {
                            
                        // }}
                    >
                        Click here to register address as student!
                    </Button> 
                </Card>
            </main>
        </div>
    )
}

export default Login