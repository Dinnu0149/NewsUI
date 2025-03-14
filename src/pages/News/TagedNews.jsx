import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Button } from "react-bootstrap";
import NewsLayout from "../../components/Layout/NewsLayout";
import NewsCard from "../../components/News/NewsCard";
import Header from "../../components/Header/Header";
import NewsContext from "../../contexts/NewsContex";
import { useParams } from "react-router-dom";

const TagedNews = () => {
  const [page, setPage] = useState(1);

  const observer = useRef();
  const { tag_id, tag_name } = useParams();

  const {
    getTagNewsItemsData,
    getTagNewsItemsIsLoading,
    getTagNewsItemsError,
    getTagNewsItemsHasNext,
    fetchTagNews,
    getTagItemsData,
  } = useContext(NewsContext);

  const lastNewsRef = useCallback(
    (node) => {
      if (getTagNewsItemsIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && getTagNewsItemsHasNext && !getTagNewsItemsError) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [getTagNewsItemsIsLoading]
  );

  useEffect(() => {
    fetchTagNews(page, tag_id);
  }, [page, tag_id]);

  const newsList = useMemo(
    () =>
      getTagNewsItemsData.map((item, index) => {
        if (getTagNewsItemsData.length === index + 1) {
          return <NewsCard key={item.id} item={item} />;
        }
        return <NewsCard key={item.id} item={item} />;
      }),
    [getTagNewsItemsData]
  );

  const memoizedHeaderSection = useMemo(() => <Header title={tag_name} />, []);

  return (
    <NewsLayout dataLoading={false}>
      <div className="container mt-3 bg-white p-4 ">
        {memoizedHeaderSection}
        {newsList}
        <div
          id="loading"
          className="d-flex justify-content-center align-content-center p-5"
        >
          {getTagNewsItemsHasNext && (
            <Button
              className="d-flex align-items-center"
              variant="outline-success rounded-pill"
              disabled
              ref={lastNewsRef}
            >
              <i className="fa-solid fa-spinner fa-spin me-2"></i>
              Loading...
            </Button>
          )}
        </div>
      </div>
    </NewsLayout>
  );
};

export default React.memo(TagedNews);
