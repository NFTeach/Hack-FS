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

import React, { useState } from "react";

const { Text } = Typography;
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Card
      form={form}
      title='Upload Course Content'
      style={{
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        width: "65%",
        display: "inline",
      }}
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <div>
        <Form.Item
          style={{
            width: "100%",
            display: "block",
            margin: "2px",
          }}
          required
          tooltip='This is a required field'
        >
          <Input placeholder='Full Name' />
        </Form.Item>
      </div>
      <br />
      <div
        style={{
          display: "inline",
          float: "left",
          width: "45%",
        }}
      >
        <Form.Item required tooltip='This is a required field'>
          <Input placeholder='Phone Number' />
        </Form.Item>
      </div>
      <div
        style={{
          display: "inline",
          float: "right",
          width: "50%",
        }}
      >
        <Form.Item required tooltip='This is a required field'>
          <Input placeholder='Email Address' />
        </Form.Item>
      </div>
      <div
        style={{
          display: "inline",
          float: "left",
          width: "45%",
        }}
      >
        <Form.Item required tooltip='This is a required field'>
          <Input placeholder='Course Name' />
        </Form.Item>
      </div>
      <div
        style={{
          display: "inline",
          float: "right",
          width: "50%",
        }}
      >
        <Select
          mode='multiple'
          style={{
            width: "100%",
          }}
          placeholder='Select Course Difficulty'
          onChange={handleChange}
          optionLabelProp='label'
        >
          <Option value='beginner' label='Beginner'>
            <div className='demo-option-label-item'>
              <span role='img' aria-label='Beginner '>
                👶{" "}
              </span>
              Beginner
            </div>
          </Option>
          <Option value='intermediate' label='Intermediate'>
            <div className='demo-option-label-item'>
              <span role='img' aria-label='Intermediate'>
                👩‍🦱{" "}
              </span>
              Intermediate
            </div>
          </Option>
          <Option value='expert' label='Expert'>
            <div className='demo-option-label-item'>
              <span role='img' aria-label='Expert'>
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
      <div style={{ display: "grid", width: "100%" }}>
        <Form.Item required tooltip='This is a required field'>
          <Input placeholder='Course Info' />
        </Form.Item>
      </div>
      <Select
        mode='multiple'
        style={{
          width: "100%",
          display: "inline-block",
        }}
        placeholder='Select Course Category'
        onChange={handleChange}
        optionLabelProp='label'
      >
        <Option value='cryptocurrency' label='Cryptocurrency'>
          <div className='demo-option-label-item'>
            <span role='img' aria-label='Cryptocurrency '>
              💰{" "}
            </span>
            Cryptocurrency
          </div>
        </Option>
        <Option value='chemistry' label='Chemistry'>
          <div className='demo-option-label-item'>
            <span role='img' aria-label='Chemistry'>
              🧪{" "}
            </span>
            Chemistry
          </div>
        </Option>
        <Option value='artificial intelligence' label='Artificial Intelligence'>
          <div className='demo-option-label-item'>
            <span role='img' aria-label='Artificial Intelligence'>
              🤖{" "}
            </span>
            Artificial Intelligence
          </div>
        </Option>
        <Option value='bitcoin' label='Bitcoin'>
          <div className='demo-option-label-item'>
            <span role='img' aria-label='Bitcoin'>
              🪙{" "}
            </span>
            Bitcoin
          </div>
        </Option>
      </Select>
      <br />
      <div
        style={{
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Form.Item>
          <br />
          <Upload {...props}>
            <Button size='large' icon={<UploadOutlined />}>
              Click to Upload
            </Button>
          </Upload>
          <br />
          <Button type='primary' size='large'>
            Submit Course
          </Button>
        </Form.Item>
      </div>
    </Card>
  );
};

export default UploadContent;
