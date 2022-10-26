import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Styles from "../styles/pages/Create.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { createCampaign } from "services/campaign.service";
import { useMutation } from "react-query";
import moment from "moment";
import { create } from "ipfs-http-client";

// const client = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });

const { TextArea } = Input;
const { Option } = Select;

export default function createFund() {
  const client = create("https://ipfs.infura.io:5001/api/v0");
  // const props = {
  //   name: "file",
  //   // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     console.log(info);
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const [fileUrl, changeFileUrl] = useState(``);
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      changeFileUrl(url);
    } catch (error) {
      console.log("File ain`t uploadin..", error);
    }
  }

  function fireUpload() {
    document.getElementById("image-input").click();
  }

  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
  }, [authUser, loading]);

  const finishMutation = useMutation(createCampaign, {
    onSuccess: (data) => {
      message.success("Campaign created successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = async (values) => {
    const data = {
      ...values,
      currentAmount: 0,
      dateOfCreation: moment(values.dateOfCreation).format("YYYY-MM-DD"),
      numberOfDonors: 0,
      featured: true,
    };
    await finishMutation.mutateAsync(data);
  };

  return (
    <Row className={Styles.outerContainer}>
      <Col span={8} className={Styles.leftContainer}>
        <Image src="/logo.png" alt="logo" width={120} height={40} />
        <h1>Let's begin your fundraising journey!</h1>
        <p>We're here to guide you every step of the way.</p>
      </Col>
      <Col span={16} className={Styles.rightContainer}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="maintainerName"
            label="Who will be the campaign's maintainer?"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="What would you like your campaign to be called?"
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Describe your campaign.">
            <TextArea rows={4} />
          </Form.Item>
          {/* <Form.Item name="image" label="Please provide an image.">
            <input
              type="file"
              onChange={onChange}
              id="image-input"
              className={Styles.imageInput}
              style={{
                display: "none",
              }}
            />
            <button
              className={Styles.uploadButton}
              onClick={() => {
                fireUpload();
              }}
            >
              Upload
            </button>
          </Form.Item> */}
          <Form.Item
            name="goalAmount"
            label="How much would you like to raise?"
          >
            {/* <InputNumber prefix="₹" /> */}
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="What best describes why you're fundraising?"
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="animals">Animals</Option>
              <Option value="business">Business</Option>
              <Option value="community">Community</Option>
              <Option value="education">Education</Option>
              <Option value="emergencies">Emergencies</Option>
              <Option value="environment">Environment</Option>
              <Option value="family">Family</Option>
              <Option value="funeral">Funeral</Option>
              <Option value="medical">Medical</Option>
              <Option value="sports">Sports</Option>
              <Option value="volunteer">Volunteer</Option>
            </Select>
          </Form.Item>
          {/* <Divider style={{ marginTop: "6rem" }} /> */}
          <Row className={Styles.btnWrapper}>
            <Button
              type="primary"
              size="large"
              className={Styles.continueBtn}
              htmlType="submit"
            >
              Continue
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
