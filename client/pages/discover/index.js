import { Button, Card, Col, Progress, Row, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { getAllCampaigns, getAllCategories } from "services/campaign.service";
import Styles from "../../styles/pages/Discover.module.scss";

export default function discover() {
  const allCampaigns = useQuery("allCampaigns", getAllCampaigns);
  const allCategories = useQuery("allCategories", getAllCategories);
  console.log("allca", allCategories);

  return (
    <Col className={Styles.controller}>
      <Row justify="space-around" className={Styles.loginNav}>
        <div className={Styles.img}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={120} height={40} />
          </Link>
        </div>
        <Link href="/profile">
          <p>Go to your profile! </p>
        </Link>
      </Row>
      <Row>
        <Col className={Styles.topContainer}>
          <h1>Browse fundraisers</h1>
          <h3>
            People around the world are raising money for what they are
            passionate about.
          </h3>
          <Button
            size="large"
            className={Styles.continueBtn}
            onClick={() => {
              window.location.href = `/create`;
            }}
          >
            Start a campaign
          </Button>
        </Col>
      </Row>
      <Row className={Styles.bottomContainer}>
        <h1 className={Styles.heading}>Fundraisers to Explore</h1>
        <Row className={Styles.cardController}>
          {allCampaigns &&
            allCampaigns?.data?.map((campaign, idx) => (
              <Card
                hoverable
                key={idx}
                className={Styles.card}
                onClick={() => {
                  window.location.href = `/discover/${campaign.id}`;
                }}
                // cover={
                //   <img
                //     alt="example"
                //     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                //   />
                // }
              >
                <Tag className={Styles.tag} color="green">
                  {campaign.category}
                </Tag>
                <h1>{campaign?.name}</h1>
                <p>
                  {campaign?.description?.length > 100
                    ? campaign?.description?.slice(0, 100) + "..."
                    : campaign?.description}
                </p>
                <h2>
                  ₹{campaign?.currentAmount} raised of ₹{campaign?.goalAmount}
                </h2>

                <Progress
                  percent={
                    (campaign?.currentAmount / campaign?.goalAmount).toFixed(
                      2
                    ) * 100
                  }
                />
              </Card>
            ))}
        </Row>
      </Row>
    </Col>
  );
}
