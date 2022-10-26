import { Col, Input } from "antd";
import Image from "next/image";
import React from "react";
import { Button } from "antd";
import Styles from "../styles/components/Navbar.module.scss";

export default function Navbar() {
  return (
    <>
      <Col className={Styles.navContainer}>
        <Input.Search placeholder="Search" />
        <div className={Styles.img}>
          <Image src="/logo.png" alt="logo" width={120} height={40} />
        </div>
        <Col>
          <Button color="primary" className={Styles.loginBtn} href="/login">
            Sign In
          </Button>
          <Button color="primary" className={Styles.startBtn} href="/create">
            Start a Campaign
          </Button>
        </Col>
      </Col>
    </>
  );
}
