import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Col, Form, Input, Row, Button, message } from "antd";
import Image from "next/image";

import { useAuth } from "../context/AuthUserContext";
import Styles from "../styles/pages/Login.module.scss";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in firebase");
          message.success("Account created successfully");
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          message.error(error.message);
        });
    else message.error("Passwords do not match");
    event.preventDefault();
  };

  return (
    <>
      <Col className={Styles.controller}>
        <Row justify="space-around" className={Styles.loginNav}>
          <div className={Styles.img}>
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={120} height={40} />
            </Link>
          </div>
          <p>
            Already have an account?{" "}
            <span>
              <Link href={"/login"}>Sign In</Link>
            </span>
          </p>
        </Row>
        <Card title="Sign Up" className={Styles.card}>
          <Form layout="vertical">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="passwordOne"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                value={passwordOne}
                onChange={(event) => setPasswordOne(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="passwordTwo"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                value={passwordTwo}
                onChange={(event) => setPasswordTwo(event.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onSubmit}
                className={Styles.loginBtn}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </>
  );
};

export default SignUp;
