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

const NewsList = () => {
  const [page, setPage] = useState(1);
  const observer = useRef();

  const {
    getItemsData,
    getItemsIsLoading,
    getItemsError,
    getItemsHasNext,
    addItemResponse,
    getDeleteResponse,
    fetchNews,
  } = useContext(NewsContext);

  const lastNewsRef = useCallback(
    (node) => {
      if (getItemsIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && getItemsHasNext && !getItemsError) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [getItemsIsLoading]
  );

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews, getDeleteResponse, addItemResponse]);

  const newsList = useMemo(
    () =>
      getItemsData.map((item, index) => {
        if (getItemsData.length === index + 1) {
          return <NewsCard key={item.id} item={item} />;
        }
        return <NewsCard key={item.id} item={item} />;
      }),
    [getItemsData]
  );

  const memoizedHeaderSection = useMemo(() => <Header />, []);

  return (
    <NewsLayout dataLoading={false}>
      <div className="container mt-3 bg-white p-4 ">
        {memoizedHeaderSection}
        {newsList}
        <div
          id="loading"
          className="d-flex justify-content-center align-content-center p-5"
        >
          {getItemsHasNext && (
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

export default React.memo(NewsList);
