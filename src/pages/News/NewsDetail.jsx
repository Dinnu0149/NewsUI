import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Card, Button, Modal, Row, Col, Image } from "react-bootstrap";
import NewsLayout from "../../components/Layout/NewsLayout";
import Header from "../../components/Header/Header";
import NewsContext from "../../contexts/NewsContex";
import { useParams, useNavigate, Link } from "react-router-dom";
import DeletePop from "../../components/Popup/DeletePop";

const NewsDetail = () => {
  const { news_id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const {
    getTagItemsData: tags = [],
    getSingleItemData: news = {},
    fetchNewsDetail,

    getDeleteResponse,
    getDeleteIsLoading,
    handleLikeDislike,
  } = useContext(NewsContext);

  useEffect(() => {
    fetchNewsDetail(news_id);
  }, [news_id]);

  useEffect(() => {
    if (getDeleteResponse && !getDeleteIsLoading) {
      navigate("/");
    }
  }, [getDeleteResponse, getDeleteIsLoading]);

  const handleLike = useCallback(() => {
    handleLikeDislike(news.id, "like", "detail");
  }, [news.id]);

  const handleDisLike = useCallback(() => {
    handleLikeDislike(news.id, "dislike", "detail");
  }, [news.id]);

  const handleDeletePopUp = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, [news.id]);

  const memoizedDeletePopUp = useMemo(
    () => (
      <DeletePop
        news={news}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    ),
    [showModal]
  );

  const memoizedHeader = useMemo(() => <Header title={"Details"} />, []);

  return (
    <NewsLayout dataLoading={false}>
      <div className="container mt-5 mb-3">
        {memoizedHeader}
        <Row className="mt-3">
          {/* News Content */}
          <Col md={8}>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Card className="border-0 bg-transparent">
                  <h5 className="card-title mb-3">{news.title}</h5>
                  <Image
                    src={news.picture}
                    className="card-img-top rounded-4"
                    alt={news.title}
                  />
                  <small className="text-body-tertiary mt-1">
                    {new Date(news.created_at).toLocaleDateString()}
                  </small>
                  <Card.Body>
                    <p className="card-text">{news.text}</p>
                  </Card.Body>
                  <div className="d-flex align-items-center">
                    {/* Like Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={handleLike}
                    >
                      <i className="fa-solid fa-thumbs-up"></i>{" "}
                      <span>{news.likes}</span>
                    </Button>
                    {/* Dislike Button */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={handleDisLike}
                    >
                      <i className="fa-solid fa-thumbs-down"></i>{" "}
                      <span>{news.dislikes}</span>
                    </Button>
                    {/* Views */}
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="border-0 bg-transparent"
                      disabled
                    >
                      <i className="fa-solid fa-eye"></i>{" "}
                      <span>{news.views}</span>
                    </Button>
                  </div>

                  {/* Delete Button & Modal */}
                  {/* <div className="d-flex justify-content-end mt-3">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleDeletePopUp}
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete
                    </Button>
                  </div> */}

                  {memoizedDeletePopUp}
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Sidebar with Tags */}
          <Col md={4} className=" mt-lg-0 mt-5">
            <Row>
              <Col md={8}>
                <Card className="bg-transparent border-0">
                  <h5 className="card-title mb-3">Get more news by tags</h5>
                  <Row>
                    {tags.map((tag) => (
                      <Col key={tag.id} xs={12}>
                        <Link
                          to={`/news/tag/${tag.name}/${tag.id}`}
                          className="text-decoration-none"
                        >
                          <p className="bg-danger-subtle text-danger rounded-pill text-capitalize text-center py-2">
                            {tag.name}
                          </p>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </NewsLayout>
  );
};

export default React.memo(NewsDetail);
