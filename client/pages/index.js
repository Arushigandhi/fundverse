import React from "react";
import Navbar from "components/Navbar";
import { Button, Col, Row } from "antd";
import Styles from "../styles/pages/Home.module.scss";

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
      {/* <Row>
        <Col className={Styles.about}>
          <h1 className={Styles.aboutTitle}>About Fundverse</h1>
          <p className={Styles.aboutText}>
            Fundverse is a platform that helps you raise funds for your
            projects, events, and more. We are a community of people who believe
            in the power of giving and helping others.
          </p>
        </Col>
      </Row> */}
    </>
  );
}
