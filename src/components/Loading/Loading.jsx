import React, { useMemo } from "react";
import { Placeholder, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

function Loading({ getLoading = true }) {

  const memoizedCardPlaceHolderSection = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx} md={3} sm={6} xs={6} className="mb-4 ">
          <Card className="border-0 shadow-lg rounded-4">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </Col>
      )),
    []
  );

  return (
    <>
      <section className="mx-3">
        {getLoading ? (
          <div className="loading-layout">
            <Row className="mb-4">
              <Col lg={4} xs={4}>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} className={"py-3 rounded"} />
                </Placeholder>
              </Col>
              <Col lg={4} xs={4}>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} className={"py-3 rounded-pill"} />
                </Placeholder>
              </Col>
              <Col lg={4} xs={4}>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} className={"py-3 rounded-pill"} />
                </Placeholder>
              </Col>
            </Row>
            <Row className="mb-4">
              {memoizedCardPlaceHolderSection}
            </Row>
            <Row>
              <Col>
                <Card className="border-0 shadow-lg h-100">
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                      <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                      <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="loader-container">
            <FontAwesomeIcon
              icon={faSnowflake}
              spin
              size="6x"
              className="loader-icon"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default React.memo(Loading);
