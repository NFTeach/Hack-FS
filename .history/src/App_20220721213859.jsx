import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import moralis, { Moralis } from "moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Account from "./components/Account/Account";
import Chains from "./components/Chains/Chains";
import { 
  Layout,
  Card,
  Button,
  notification
} from "antd";
import "antd/dist/antd.css";
import NativeBalance from "./components/NativeBalance";
import "./style.css";
import UploadContent from "./components/UploadContent";
import Content from "./components/Content";
import Tests from "./components/Tests";
import CreateTest from "./components/CreateTest";
import EduDash from "./components/EduDash";
import StuDash from "./components/StuDash";
import ProfileSettings from "./components/ProfileSettings";
import Test from "./components/Test";
import EducatorMenuItems from "./components/EducatorMenuItems";
import StudentMenuItems from "./components/StudentMenuItems";
import { ConnectButton } from "web3uikit";
import useWindowDimensions from './util/useWindowDimensions';

let appId=process.env.REACT_APP_MORALIS_APPLICATION_ID;
let serverUrl=process.env.REACT_APP_MORALIS_SERVER_URL;
moralis.initialize(appId);
moralis.serverURL = serverUrl;
Moralis.start({serverUrl, appId})

const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    width: "17%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  registerCard: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
    width: "30%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
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
    float: "right",
    marginTop: "10px",
  },
  educatorButton: {
    float: "left",
    marginTop: "10px",
  },
};

const App = ({ isServerInfo }) => {
  const {
    Moralis, 
    isWeb3Enabled, 
    enableWeb3, 
    isAuthenticated, 
    isWeb3EnableLoading 
  } = useMoralis();

  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const [isStudentRegisteringInProgress, setIsStudentRegisteringInProgress] = useState(false);
  const [isEducatorRegisteringInProgress, setIsEducatorRegisteringInProgress] = useState(false);
  const [isUserEducator, setIsUserEducator] = useState(false);
  const [isUserStudent, setIsUserStudent] = useState(false);
  const user = moralis.User.current();

  // Register student smart contract call
  const registerStudent = async () => {
    if (isAuthenticated) {
        notification.info({
          message: "Address registered as student!",
          description: "Your address is being registered as a student!"
        })  
    }

    if (isUserEducator == true) {
      notification.error({
        message: "Address registered as educator!",
        description: "Please use another address if you want to be a student!"
      })
      return;
    }

    let studentAddressTo = user.attributes.accounts[0];

    const studentParams = {
        to: studentAddressTo,
    }

    async function callAddStudent(){
      const _Result = await Moralis.Cloud.run("registerStudent", studentParams)
      // console.log(_Result)
    }
    callAddStudent();
  }

  // Register educator smart contract call
  const registerEducator = async () => {
    if (isAuthenticated) {
      notification.info({
        message: "Address registered as educator!",
        description: "Your address is being registered as a educator!"
      })  
    }

    if (isUserStudent== true) {
      notification.error({
        message: "Address registered as student!",
        description: "Please use another address if you want to be a educator!"
      })
      return;
    }

    let educatorAddressTo = user.attributes.accounts[0];

    const educatorParams = {
      to: educatorAddressTo,
    }

    async function callAddEducator(){
      const _Result = await Moralis.Cloud.run("registerEducator", educatorParams)
      // console.log(_Result)
    }
    callAddEducator();
  }

  useEffect(() => {
    async function getIsUserEducator() {
        try {
            const Educators = Moralis.Object.extend("Educators");
            const query = new Moralis.Query(Educators);
            query.equalTo("educator", user.attributes.accounts[0])
            const educatorResults = await query.find();
            if (educatorResults.length != 0) {
              setIsUserEducator(true);
            }
        } catch(error) {
            console.log(error)
        }
    }
    getIsUserEducator();
  }, []);

  useEffect(() => {
    async function getIsUserStudent() {
        try {
            const Students = Moralis.Object.extend("Students");
            const query = new Moralis.Query(Students);
            query.equalTo("student", user.attributes.accounts[0])
            const studentResults = await query.find();
            if (studentResults.length != 0) {
              setIsUserStudent(true);
            }
        } catch(error) {
            console.log(error)
        }
    }
    getIsUserStudent();
  }, []);

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  // console.log(educators)
  // console.log(students)
  // console.log(user)
  console.log(isUserEducator)
  console.log(isUserStudent)

  return (
    <> 
    {isAuthenticated && isUserEducator || isUserStudent || isStudentRegisteringInProgress || isEducatorRegisteringInProgress  ? (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}> 
          {isStudentRegisteringInProgress || isUserStudent ? (
            <StudentMenuItems />
          ) : (
            <EducatorMenuItems />
          )}
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path='/uploadcontent'>
              <UploadContent isServerInfo={isServerInfo} />
            </Route>
            <Route exact path='/content'>
              <Content isServerInfo={isServerInfo} />
            </Route>
            <Route exact path='/createtest'>
              <CreateTest isServerInfo={isServerInfo} />
            </Route>
            <Route exact path='/tests'>
              <Tests isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/test">
              <Test isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/edudash">
              <EduDash isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/studash">
              <StuDash isServerInfo={isServerInfo} />
            </Route>
            <Route exact path='/profilesettings'>
              <ProfileSettings isServerInfo={isServerInfo} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  ) : (
    <>
    {isAuthenticated ? (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <div style={styles.content}>
          <Card
          style={!isMobile ? styles.registerCard : styles.mobileCard}
          title={"Are you here to learn or teach?"}
          >
          <Button
              style={styles.educatorButton}
              type="primary"
              loading={isEducatorRegisteringInProgress}
              onClick={async () => {
                setIsEducatorRegisteringInProgress(true);
                await registerEducator();
              }}
          >
          Register as Educator!
          </Button>
          <Button
              style={styles.studentButton}
              type="primary"
              loading={isStudentRegisteringInProgress}
              onClick={async () => {
                setIsStudentRegisteringInProgress(true);
                await registerStudent();
              }}
          >
          Register as Student!
          </Button> 
        </Card>
      </div>
      </Layout>
      ) : (
          <>
          <Layout style={{ height: "100vh", overflow: "auto" }}>
            <div style={styles.content}>
              <Card
                style={!isMobile ? styles.card : styles.mobileCard}
                title={"Welcome to NFTeach!😀"}
              >
                <ConnectButton />
              </Card>
            </div>
          </Layout>
          </>
        )}
      </>
    )}
    </>
  );
};

export default App;