import { useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../context/AuthUserContext";

import { Card, Col, Form, Input, Row, Button, message } from "antd";
import Image from "next/image";
import Styles from "../styles/pages/Login.module.scss";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        message.success("Login successful");
        router.push("/discover");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
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
            Do not have an account?{" "}
            <span>
              <Link href={"/register"}>Sign Up</Link>
            </span>
          </p>
        </Row>
        <Card title="Sign In" className={Styles.card}>
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
              name="password"
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                onClick={onSubmit}
                className={Styles.loginBtn}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </>
  );
}
