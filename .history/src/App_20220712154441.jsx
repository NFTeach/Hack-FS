import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Account from "./components/Account/Account";
import Chains from "./components/Chains/Chains";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "./components/NativeBalance";
import "./style.css";
// import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
import UploadContent from "./components/UploadContent";
import Content from "./components/Content";
import Tests from "./components/Tests";
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
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/uploadcontent">
              <UploadContent isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/content">
              <Content isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/tests">
              <Tests isServerInfo={isServerInfo} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Layout>
  );
};

export default App;

