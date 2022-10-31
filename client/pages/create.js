import { Button, Col, Form, Input, Row, Select, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Styles from "../styles/pages/Create.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { createCampaign } from "services/campaign.service";
import { useMutation } from "react-query";
import moment from "moment";
import { PickerOverlay } from "filestack-react";
import Link from "next/link";

const { TextArea } = Input;
const { Option } = Select;

export default function createFund() {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [img, setImg] = useState();

  const open = () => {
    setShow(true);
  };

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
  }, [authUser, loading]);

  const finishMutation = useMutation(createCampaign, {
    onSuccess: (data) => {
      message.success("Campaign created successfully");
      router.push("/discover");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = async (values) => {
    const data = {
      ...values,
      image: img,
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
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={120} height={40} />
        </Link>
        <h1>Let's begin your fundraising journey!</h1>
        <p>We're here to guide you every step of the way.</p>
      </Col>
      <Col span={16} className={Styles.rightContainer}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="image" label="Please provide an image.">
            <button
              className={Styles.uploadButton}
              onClick={() => setShow(true)}
            >
              Upload
            </button>
          </Form.Item>
          <Form.Item
            name="maintainerName"
            label="Who will be the campaign's maintainer?"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="What would you like your campaign to be called?"
            rules={[
              {
                required: true,
                message: "Please input campaign's name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Describe your campaign.">
            <TextArea rows={4} />
          </Form.Item>

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
          <Row className={Styles.btnWrapper}>
            <Button
              size="large"
              className={Styles.continueBtn}
              htmlType="submit"
            >
              Continue
            </Button>
          </Row>
        </Form>
      </Col>
      {show && (
        <PickerOverlay
          apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY}
          onUploadDone={(res) => {
            setImg(res.filesUploaded[0].url);
            setShow(false);
          }}
        >
          <div style={{ height: "800px" }} />
        </PickerOverlay>
      )}
    </Row>
  );
}
