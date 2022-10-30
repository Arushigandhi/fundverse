import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Col, Row, Button } from "antd";

const LoggedIn = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  console.log(authUser);

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div>
      {loading ? (
        <Row>
          <Col>Loading....</Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              {authUser && (
                <div>Congratulations {authUser?.email}! You are logged in.</div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={signOut}>Sign out</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default LoggedIn;
