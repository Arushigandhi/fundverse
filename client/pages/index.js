import React from "react";
import Navbar from "components/Navbar";
import { Button, Col, Row } from "antd";
import Styles from "../styles/pages/Home.module.scss";
import Image from "next/image";
import { LikeOutlined } from "@ant-design/icons";

export default function index() {
  return (
    <>
      <Row className={Styles.hero}>
        <Navbar />
        <Col className={Styles.controller}>
          <h1 className={Styles.title}>
            Your home <br /> for help <br />
          </h1>
          <Button className={Styles.getStartedBtn} href="/discover">
            Get Started with Fundverse
          </Button>
        </Col>
      </Row>
      <Row className={Styles.about}>
        <Col>
          <div>
            <h1 className={Styles.aboutTitle}>About Fundverse</h1>
            <p className={Styles.aboutText}>
              Fundraising on FundVerse takes just a few minutes
            </p>
            <Image src="/image.jpg" alt="about" width={1078} height={199} />
          </div>
        </Col>
      </Row>
      <Row className={Styles.green}>
        <h1>
          <b>We've got you covered. </b>Our team is highly dedicated to trust
          and safety, we aim to manage fundraisers worldwide for the decades to
          come. Don’t worry about a thing, we’ve got it covered.
          <p style={{ fontSize: "1rem", marginTop: "1rem" }}>
            <LikeOutlined /> Secure and Trusted
          </p>
        </h1>
      </Row>
      <Row className={Styles.footer}>
        <Col span={14}>
          <h1>Ready to get started? Join thousands of others today.</h1>
          <Button className={Styles.startBtn} href="/discover">
            Start a campaign
          </Button>
        </Col>
        <Col span={8}>
          <Image
            src="/footer-flower-cta.png"
            alt="about"
            width={300}
            height={300}
          />
        </Col>
      </Row>
      <Row className={Styles.footerBottom}></Row>
    </>
  );
}
