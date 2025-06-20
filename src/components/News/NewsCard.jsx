import React, { useContext, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NewsContext from "../../contexts/NewsContex";

const NewsCard = ({ item }) => {  
  const { handleLikeDislike } = useContext(NewsContext);

  const handleLike = useCallback(() => {
    handleLikeDislike(item.id, "like", "list");
  }, [item.id]);

  const handleDisLike = useCallback(() => {
    handleLikeDislike(item.id, "dislike", "list");
  }, [item.id]);

  return (
    <div className="row mb-4 ">
      <div className="col-md-4">
        <Link to={`/news/${item.id}/detail`} className="text-decoration-none">
          <img src={item.picture} className="img-fluid rounded-4" alt={item.title} />
        </Link>
      </div>
      <div className="col-md-8 align-content-center">
        <Link to={`/news/${item.id}/detail`} className="text-decoration-none">
          <h3 className="fw-bold text-dark">{item.title}</h3>
          <p className="text-danger small">
            <i className="fa-solid fa-tags"></i>{" "}
            {item.tags_list.map((tag) => tag.name).join(", ")}
          </p>
          <p className="text-muted">{item.text.substring(0, 100)}...</p>
        </Link>
        <div className="d-flex align-items-center">
          <Button
            variant="outline-danger"
            size="sm"
            className="me-2"
            onClick={handleLike}
          >
            <i className="fa-solid fa-thumbs-up"></i> {item.likes}
          </Button>
          <Button
            variant="outline-danger"
            className="btn-sm me-2"
            onClick={handleDisLike}
          >
            <i className="fa-solid fa-thumbs-down"></i> {item.dislikes}
          </Button>
          <Button
            variant="outline-success"
            className="btn-sm small border-0"
            disabled
          >
            <i className="fa-solid fa-eye"></i> {item.views}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsCard);
