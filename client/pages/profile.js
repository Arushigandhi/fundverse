import { Button, Card, Col, Form, Input, Row, message, Avatar } from "antd";
import Image from "next/image";
import Styles from "../styles/pages/Login.module.scss";
import Link from "next/link";
import { useAuth } from "context/AuthUserContext";
import { useEffect, useState } from "react";
import { PickerOverlay } from "filestack-react";
import { getUser, updateUser } from "services/user.service";
import { useMutation, useQuery } from "react-query";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function Home() {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  console.log(authUser);

  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  const { data: user, isLoading } = useQuery(
    "user",
    () => getUser(authUser.uid),
    {
      enabled: !!authUser,
    }
  );
  console.log("user", user);

  const finishMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      message.success("User data updated successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = async (values) => {
    const data = {
      ...values,
      image: img,
      uid: authUser.uid,
    };
    await finishMutation.mutateAsync(data);
  };

  return (
    <>
      {!isLoading && user ? (
        <Col className={Styles.controller}>
          <Row justify="space-around" className={Styles.loginNav}>
            <div className={Styles.img}>
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={120} height={40} />
              </Link>
            </div>
            <p>
              <span>
                <Link href={"/register"}>Go to Discover</Link>
              </span>
            </p>
          </Row>
          <Card
            title={
              <Row justify="space-around" align="center">
                <h4 style={{ margin: "0" }}>Update your Profile</h4>
                <Button
                  className={Styles.uploadButton}
                  style={{ width: "20%", margin: "0", marginTop: "10px" }}
                  onClick={signOut}
                >
                  Log Out
                </Button>
              </Row>
            }
            className={Styles.card}
          >
            <Row
              style={{ padding: "2rem", paddingTop: "0" }}
              align="center"
              justify="center"
            >
              {user ? (
                <Avatar size={128} src={user[0]?.image} />
              ) : (
                <Avatar size={128} icon={<UserOutlined />} />
              )}
            </Row>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                name: user[0]?.name,
                description: user[0]?.description,
              }}
            >
              <Form.Item name="image">
                <button
                  className={Styles.uploadButton}
                  onClick={() => setShow(true)}
                >
                  Update Profile Image
                </button>
              </Form.Item>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item name="description">
                <Input.TextArea
                  size="large"
                  placeholder="Update Description"
                  rows={4}
                />
              </Form.Item>

              <Button htmlType="submit" className={Styles.loginBtn}>
                Update
              </Button>
            </Form>
          </Card>
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
        </Col>
      ) : (
        ""
      )}
    </>
  );
}
