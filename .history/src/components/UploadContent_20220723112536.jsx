import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  Card,
  message,
  Upload,
} from "antd";

import { useMoralis } from "react-moralis";
import moralis from "moralis";

import React, { useEffect, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadContent = () => {
  const [form] = Form.useForm("vertical");
  const [requiredMark, setRequiredMarkType] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [courseSubject, setCourseSubject] = useState(null);
  const [courseDifficulty, setCourseDifficulty] = useState(null);
  const [testTokenIdPrerequisites, setTestTokenIdPrerequisites] = useState([]);
  const [testNamesPrerequisites, setTestNamesPrerequisites] = useState([]);
  const [testPrerequisites, setTestPrerequisites] = useState({});
  const [courseDescription, setCourseDescription] = useState(null);
  const [courseLength, setCourseLength] = useState(null);
  const [courseFile, setCourseFile] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImageUri, setUploadedImageUri] = useState(null);

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const {
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();
  const user = moralis.User.current();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    async function getTests() {
      try {
        const Tests = Moralis.Object.extend("Tests");
        const testQuery = new Moralis.Query(Tests);
        const tests = await testQuery.find();
        setTestPrerequisites(tests)
        // console.log(tests)
        // let preReqTests = {};
        let tokenIds = [];
        let testNames = [];
        for(let i = 0; i < tests.length; i++) {
          tokenIds.push(JSON.stringify(tests[i].attributes.tokenId))
          testNames.push(tests[i].attributes.testName)
        }
        setTestTokenIdPrerequisites(tokenIds);
        setTestNamesPrerequisites(testNames);
      } catch(error) {
        console.log(error)
      }
    }
    getTests();
  },[]);

  // console.log(testPrerequisites)
  console.log(testTokenIdPrerequisites);
  console.log(testNamesPrerequisites);

  async function saveCourse() {
    const courseCreator = user.get("ethAddress");
    const Course = moralis.Object.extend("Course");

    const newCourse = new Course();

    newCourse.set("courseName", courseName);
    newCourse.set("courseSubject", courseSubject);
    newCourse.set("courseDifficulty", courseDifficulty);
    // newCourse.set("testPrerequisites", testPrerequisites);
    newCourse.set("courseDescription", courseDescription);
    newCourse.set("courseLength", courseLength);
    newCourse.set("courseFile", courseFile);
    newCourse.set("courseCreator", courseCreator);

    await newCourse.save();
    console.log("Your course was saved");
  }

  return (
    <Card
      headStyle={{
        background: "#21bf96",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
      form={form}
      title="Upload Course Content"
      style={{
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        width: "50%",
        display: "inline",
      }}
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <div>
        <p>
          The descriptions you write here will help students decide if your
          course is the one for them
        </p>
        <p>Course Name</p>
        <Form.Item
          style={{
            width: "100%",
            display: "block",
            margin: "2px",
          }}
          required
          tooltip="This is a required field"
        >
          <Input
            onChange={(event) => setCourseName(event.target.value)}
            placeholder="Course's name"
          />
        </Form.Item>
      </div>
      <br />
      <p>Course Subject</p>
      <Select
        mode="multiple"
        style={{
          width: "100%",
          display: "inline-block",
        }}
        placeholder="Select Course Category"
        onChange={setCourseSubject}
        optionLabelProp="label"
      >
        <Option value="cryptocurrency" label="Cryptocurrency">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Cryptocurrency ">
              💰{" "}
            </span>
            Cryptocurrency
          </div>
        </Option>
        <Option value="chemistry" label="Chemistry">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Chemistry">
              🧪{" "}
            </span>
            Chemistry
          </div>
        </Option>
        <Option value="artificial intelligence" label="Artificial Intelligence">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Artificial Intelligence">
              🤖{" "}
            </span>
            Artificial Intelligence
          </div>
        </Option>
        <Option value="bitcoin" label="Bitcoin">
          <div className="demo-option-label-item">
            <span role="img" aria-label="Bitcoin">
              🪙{" "}
            </span>
            Bitcoin
          </div>
        </Option>
      </Select>
      <div
        style={{
          display: "inline",
          float: "right",
          width: "50%",
        }}
      >
        <br />
        {/* <Form.List name="testPrerequisites">
          {testPrerequisites.map(({attributes, id}) => {
            <Form.Item key={id}>
              <Select>
                {attributes.map((option) => (
                  <Select.Option key={option} value={option}>{option}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          })}
        </Form.List> */}

        {/* <Form.Item required tooltip="This is a required field">
          <p>Test Pre-requisites</p>

          <Input
            onChange={(event) => setTestPrerequisites(event.target.value)}
            placeholder="ex: Math101, Solidity202"
          />
        </Form.Item> */}
      </div>
      <div
        style={{
          display: "inline",
          float: "left",
          width: "45%",
        }}
      >
        <br />
        <p>Course Difficulty</p>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Select Course Difficulty"
          onChange={setCourseDifficulty}
          optionLabelProp="label"
        >
          <Option value="beginner" label="Beginner">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Beginner ">
                👶{" "}
              </span>
              Beginner
            </div>
          </Option>
          <Option value="intermediate" label="Intermediate">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Intermediate">
                👩‍🦱{" "}
              </span>
              Intermediate
            </div>
          </Option>
          <Option value="expert" label="Expert">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Expert">
                👵{" "}
              </span>
              Expert
            </div>
          </Option>
        </Select>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "grid", width: "100%" }}>
        <Form.Item required tooltip="This is a required field">
          <p>Course Description</p>
          <Input
            onChange={(event) => setCourseDescription(event.target.value)}
            placeholder="ex: Math 101 is a course for students who need to improve their algebraic skills before taking a higher level course such ..."
          />
        </Form.Item>
      </div>

      <p>Course Length</p>
      <Form.Item
        style={{
          width: "100%",
          display: "block",
          margin: "2px",
        }}
        required
        tooltip="This is a required field"
      >
        <Input
          onChange={(event) => setCourseLength(event.target.value)}
          placeholder="ex: 3 weeks"
        />
      </Form.Item>

      <div
        style={{
          textAlign: "left",
          marginRight: "50",
        }}
      >
        <Form.Item>
          <br />
          <p>Upload Course Image</p>
          <Upload
            {...props}
            onChange={(event) => setCourseFile(event.file)}
            maxCount={1}
          >
            <Button size="large" icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
          <br />
        </Form.Item>
      </div>

      <div
        style={{
          textAlign: "left",
          marginRight: "50",
        }}
      >
        <Form.Item>
          <br />
          <p>Upload Course PDF</p>
          <Upload
            {...props}
            onChange={(event) => setCourseFile(event.file)}
            maxCount={1}
          >
            <Button size="large" icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
          <br />
        </Form.Item>
      </div>

      <div
        style={{
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Form.Item>
          <Button type="primary" size="large" onClick={saveCourse}>
            Submit Course
          </Button>
        </Form.Item>
      </div>
    </Card>
  );
};

export default UploadContent;
