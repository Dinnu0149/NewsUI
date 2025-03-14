import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import NewsLayout from "../../components/Layout/NewsLayout";
import Header from "../../components/Header/Header";
import NewsContext from "../../contexts/NewsContex";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: selectedOptions,
    picture: null,
  });

  const {
    getTagItemsData: tags = [],
    addItemResponse,
    addItemIsLoading,

    fetchTags,
    postNews,
  } = useContext(NewsContext);

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (addItemResponse && !addItemIsLoading) {
      navigate("/news");
    }
  }, [addItemIsLoading, addItemResponse]);

  const handleEventInfoSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formSubmitData = new FormData();
      formSubmitData.append("title", formData.title);
      formSubmitData.append("text", formData.text);
      formSubmitData.append("picture", formData.picture);

      selectedOptions.forEach((tag) => {
        formSubmitData.append("tags", tag);
      });

      postNews(formSubmitData);
    },
    [formData]
  );

  const handleChange = useCallback((e) => {
    const { name, value, checked, type, files } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSelectChange = useCallback(
    (event) => {
      const selectedValues = Array.from(
        event.target.selectedOptions,
        (option) => parseInt(option.value)
      );
      setSelectedOptions(selectedValues);
      setFormData((prev) => ({ ...prev, tags: selectedValues }));
    },
    [setSelectedOptions]
  );

  const memoizedHeader = useMemo(() => <Header title="Content" />, []);

  return (
    <NewsLayout dataLoading={false}>
      <div className="container mt-5 mb-3">
        {memoizedHeader}
        <Container className="mt-5">
          <Row>
            <Col md={4}>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <Card className="border-0 bg-transparent">
                    <h5>News</h5>
                    <p className="text-muted">Create new news here</p>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col md={8}>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <Card className="rounded-4 shadow border-0">
                    <Card.Body>
                      <h5>Create News</h5>
                      <Form
                        onSubmit={handleEventInfoSubmit}
                        encType="multipart/form-data"
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                          />
                          <small className="form-text text-muted">
                            News title
                          </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Content</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="text"
                            value={formData.content}
                            onChange={handleChange}
                            required
                          />
                          <small className="form-text text-muted">
                            Write your news here
                          </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Tags</Form.Label>
                          <Form.Select
                            as="select"
                            name="tags_list"
                            required
                            value={selectedOptions}
                            onChange={handleSelectChange}
                            multiple
                          >
                            <option>Select Tag</option>
                            {tags.length ? (
                              tags.map((tag) => (
                                <option value={tag.id} key={tag.id}>
                                  {`${tag.name}`}
                                </option>
                              ))
                            ) : (
                              <option> Loading tags...</option>
                            )}
                          </Form.Select>
                          <small className="form-text text-muted">
                            Add multiple tags
                          </small>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={handleChange}
                            name="picture"
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-center w-100">
                          <Button
                            type="submit"
                            variant="outline-danger"
                            className="px-5 py-2 rounded-pill"
                          >
                            {addItemIsLoading ? (
                              <i className="fa-solid fa-spinner fa-spin me-2"></i>
                            ) : (
                              "Create"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </NewsLayout>
  );
};

export default CreateNews;
