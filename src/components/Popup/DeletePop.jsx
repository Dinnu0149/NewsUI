import React, { useCallback, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import NewsContext from "../../contexts/NewsContex";

const DeletePop = ({ news, showModal, setShowModal }) => {
  const { handleDelete, getDeleteIsLoading } = useContext(NewsContext);

  const handleDeleteSubmit = useCallback(() => {
    handleDelete(news.id);
  }, [news.id]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {news.title?.length > 20
            ? news.title.substring(0, 20) + "..."
            : news.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this news? This action can't be
          reversed.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteSubmit}>
          {getDeleteIsLoading ? (
            <i className="fa-solid fa-spinner fa-spin me-2"></i>
          ) : (
            "Delete News"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(DeletePop);
