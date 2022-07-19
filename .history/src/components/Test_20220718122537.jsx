import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../images/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";

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
    
    return (
        <div>
        <h1>Hello world!</h1>
        </div>
    )
}

export default Test
