import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addComment,
  createDonation,
  getAllComments,
  getAllDonations,
  getRemainingAmount,
  getSpecCampaign,
} from "services/campaign.service";
import {
  Avatar,
  Button,
  Card,
  Col,
  Comment,
  Divider,
  Form,
  Progress,
  Row,
  Input,
  Tooltip,
  Modal,
  message,
  Image,
} from "antd";
import Styles from "../../styles/pages/Discover.module.scss";
import Link from "next/link";
import { HeartTwoTone, TagOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "context/AuthUserContext";
import { useRouter } from "next/router";

const { TextArea } = Input;

export default function campaignPage({ uid }) {
  const queryClient = useQueryClient();
  const { data: campaign, isLoading } = useQuery("specCampaign", () =>
    getSpecCampaign(uid)
  );

  const { data: donations } = useQuery("donations", () => getAllDonations(uid));

  const { data: rem } = useQuery("rem", () => getRemainingAmount(uid));

  const { data: comments } = useQuery("comments", () => getAllComments(uid));
  console.log(comments);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    const val = Object.values(rem[0]);
    message.success(`Amount left to raise: ${val[0]}`);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDonationModalOpen(false);
  };

  const { authUser, loading, signOut } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push("/login");
  }, [authUser, loading]);

  const finishMutation = useMutation(createDonation, {
    onSuccess: (data) => {
      message.success("Donated successfully");
      queryClient.invalidateQueries("specCampaign");
      queryClient.invalidateQueries("donations");
      setIsModalOpen(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = async (values) => {
    const data = {
      ...values,
      campaignId: uid,
      userId: authUser.uid,
      date: moment(Date.now()).format("YYYY-MM-DD"),
    };
    console.log(data);
    await finishMutation.mutateAsync(data);
  };

  const commentMutation = useMutation(addComment, {
    onSuccess: (data) => {
      message.success("Comment posted");
      queryClient.invalidateQueries("comments");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onComment = async (values) => {
    const data = {
      campaignId: uid,
      userId: authUser.uid,
      commentText: values.commentText,
      date: moment(Date.now()).format("YYYY-MM-DD"),
    };
    console.log(data);
    await commentMutation.mutateAsync(data);
  };

  return (
    <>
      {!isLoading && (
        <>
          <Col className={Styles.controller}>
            <Row justify="space-around" className={Styles.loginNav}>
              <div className={Styles.img}>
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={120}
                    height={40}
                    preview={false}
                  />
                </Link>
              </div>
              <Link href="/profile">
                <p>Go to your profile! </p>
              </Link>
            </Row>
            <Col className={Styles.infoContainer}>
              <h1>{campaign[0]?.name}</h1>
              <Row justify="space-between">
                <Col style={{ width: "65%" }}>
                  {campaign[0]?.image && (
                    <div style={{ marginBottom: "2rem" }}>
                      <Image
                        style={{ borderRadius: "12px" }}
                        src={campaign[0]?.image}
                        alt="logo"
                        width={720}
                        height={400}
                        // preview={false}
                      />
                    </div>
                  )}
                  <Row>
                    <HeartTwoTone
                      twoToneColor="#02a95c"
                      style={{ paddingRight: "0.5rem", paddingTop: "0.3rem" }}
                    />

                    <p className={Styles.user}>
                      {campaign[0]?.maintainerName} is organising this campaign
                    </p>
                  </Row>
                  <Divider />
                  <Row>
                    <p>
                      Created on{" "}
                      {moment(campaign[0]?.dateOfCreation).format("LL")} •
                      <TagOutlined
                        style={{
                          paddingRight: "0.5rem",
                          paddingTop: "0.8rem",
                          fontSize: "1rem",
                          paddingLeft: "2rem",
                        }}
                      />
                      {campaign[0]?.category}
                    </p>
                  </Row>
                  <Divider />
                  <p className={Styles.description}>
                    {campaign[0]?.description}
                  </p>
                  <Divider />
                  <h2 className={Styles.commentHeading}>Words of Support</h2>

                  {comments &&
                    comments.map((comment, idx) => (
                      <Comment
                        key={idx}
                        author={<a>{comment.name}</a>}
                        avatar={
                          <Avatar
                            src={
                              comment.image
                                ? comment.image
                                : "https://joeschmoe.io/api/v1/random"
                            }
                            alt="Platform User"
                          />
                        }
                        content={<p>{comment.commentText}</p>}
                        datetime={
                          <Tooltip title={comment.date}>
                            <span>
                              {moment(comment.date).format("DD-MM-YYYY")}
                            </span>
                          </Tooltip>
                        }
                      />
                    ))}
                  <Comment
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Platform User"
                      />
                    }
                    content={
                      <>
                        <Form onFinish={onComment}>
                          <Form.Item name="commentText">
                            <TextArea rows={4} />
                          </Form.Item>
                          <Button
                            htmlType="submit"
                            className={Styles.btnComment}
                            style={{ width: "25%" }}
                          >
                            Add Comment
                          </Button>
                        </Form>
                      </>
                    }
                  />
                </Col>
                <Col style={{ width: "30%" }}>
                  <Card className={Styles.card}>
                    <h2>
                      ₹{campaign[0]?.currentAmount} raised of ₹
                      {campaign[0]?.goalAmount}
                    </h2>

                    <Progress
                      percent={
                        (
                          campaign[0]?.currentAmount / campaign[0]?.goalAmount
                        ).toFixed(2) * 100
                      }
                    />
                    <h2 className={Styles.donors}>
                      {campaign[0]?.numberOfDonors} donors
                    </h2>
                    <Button
                      size="large"
                      className={Styles.btn}
                      onClick={showModal}
                    >
                      Donate Now
                    </Button>
                    <h2 style={{ marginTop: "2rem" }}>Recent Donations</h2>
                    {donations &&
                      donations.length > 0 &&
                      donations.slice(0, 3).map((donation, idx) => {
                        return (
                          <>
                            <Row style={{ margin: "0rem 0.5rem" }} key={idx}>
                              <HeartTwoTone
                                twoToneColor="#02a95c"
                                style={{
                                  paddingRight: "0.5rem",
                                  paddingTop: "0.3rem",
                                }}
                              />
                              <p>
                                {donation?.donator} -
                                <b> ₹{donation?.amountDonated} </b>
                              </p>
                            </Row>
                            <Divider />
                          </>
                        );
                      })}
                    <Button
                      color="primary"
                      className={Styles.startBtn}
                      onClick={() => setIsDonationModalOpen(true)}
                    >
                      See all Donations
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Modal
              title="Enter your Donation"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              centered={true}
            >
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Please enter the amount you want to donate:"
                  name="amountDonated"
                >
                  <Input prefix="₹" suffix="Ruppees" />
                </Form.Item>
                <Form.Item
                  label="What is the name of the donator?"
                  name="donator"
                >
                  <Input />
                </Form.Item>
                <Button
                  htmlType="submit"
                  className={Styles.btnComment}
                  style={{ width: "35%" }}
                >
                  Contribute
                </Button>
              </Form>
            </Modal>
            <Modal
              title={`View all Donations for ${campaign[0]?.name}`}
              open={isDonationModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              centered={true}
            >
              <Col>
                {donations &&
                  donations.length > 0 &&
                  donations.map((donation, idx) => {
                    return (
                      <>
                        <Row style={{ margin: "0rem 0.5rem" }} key={idx}>
                          <HeartTwoTone
                            twoToneColor="#02a95c"
                            style={{
                              paddingRight: "0.5rem",
                              paddingTop: "0.3rem",
                            }}
                          />
                          <p>
                            {donation?.donator} -
                            <b> ₹{donation?.amountDonated} </b>-{" "}
                            {moment(donation?.date).format("DD-MM-YYYY")}
                          </p>
                        </Row>
                        <Divider />
                      </>
                    );
                  })}
                <Button className={Styles.startBtn} onClick={showModal}>
                  Donate Now
                </Button>
              </Col>
            </Modal>
          </Col>
        </>
      )}
    </>
  );
}

campaignPage.getInitialProps = async ({ query: { uid } }) => {
  return { uid };
};
