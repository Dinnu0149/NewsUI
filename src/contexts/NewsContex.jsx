import { React, createContext, useState, useCallback } from "react";
import { getCSRFToken } from "../utils/getCSRFToken";

const NewsContext = createContext();
export default NewsContext;

export const NewsProvider = ({ children }) => {
  const [getItemsData, setGetItemsData] = useState([]);
  const [getItemsError, setGetItemsError] = useState(null);
  const [getItemsHasNext, setGetItemsHasNext] = useState(true);
  const [getItemsIsLoading, setGetItemsIsLoading] = useState(false);

  const [getTagNewsItemsData, setGetTagNewsItemsData] = useState([]);
  const [getTagNewsItemsError, setGetTagNewsItemsError] = useState(null);
  const [getTagNewsItemsHasNext, setGetTagNewsItemsHasNext] = useState(false);
  const [getTagNewsItemsIsLoading, setGetTagNewsItemsIsLoading] =
    useState(true);

  const [getTagItemsData, setGetTagItemsData] = useState([]);
  const [getTagItemsError, setGetTagItemsError] = useState(null);
  const [getTagItemsIsLoading, setGetTagItemsIsLoading] = useState(false);

  const [getSingleItemData, setGetSingleItemData] = useState([]);
  const [getSingleItemError, setSingleItemError] = useState(null);
  const [getSingleItemIsLoading, setSingleItemIsLoading] = useState(false);

  const [getDeleteResponse, setGetDeleteResponse] = useState(null);
  const [getDeleteError, setDeleteError] = useState(null);
  const [getDeleteIsLoading, setDeleteIsLoading] = useState(false);

  const [addItemError, setAddItemError] = useState(null);
  const [addItemIsLoading, setAddItemIsLoading] = useState(false);
  const [addItemResponse, setAddItemResponse] = useState(null);

  const [message, setMessage] = useState({
    text: "",
    color: "",
  });

  // const baseUrl = "http://localhost:8000/api/news";
  const baseUrl = "https://two4hnews-l1jb.onrender.com/api/news";

  const fetchNews = useCallback(async (page) => {
    setGetItemsIsLoading(true);
    setGetDeleteResponse(null);
    setAddItemResponse(null);
    try {
      const response = await fetch(`${baseUrl}/list?page=${page}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      if (!response.ok) throw new Error("Failed to fetch news");

      const newData = await response.json();
      setGetItemsData((prevData) => {
        // Remove duplicates based on 'id'
        const uniqueData = Array.from(
          new Map(
            [...prevData, ...newData.results].map((item) => [item.id, item])
          ).values()
        );

        return uniqueData;
      });

      setGetItemsHasNext(newData.next !== null);
      setGetItemsError(null);
    } catch (error) {
      setGetItemsError(error.message);
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setGetItemsIsLoading(false);
    }
  }, []);

  const fetchNewsDetail = useCallback(async (news_id) => {
    setSingleItemIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/detail/${news_id}`);

      if (!response.ok) throw new Error("Failed to fetch news");

      const newData = await response.json();
      setGetSingleItemData(newData);

      setGetItemsError(null);
    } catch (error) {
      setSingleItemError(error.message);
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setSingleItemIsLoading(false);
    }
  }, []);

  const fetchTagNews = useCallback(async (page, tag_id, type = "scroll") => {
    setGetTagNewsItemsIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/tag/${tag_id}/?page=${page}`, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      if (!response.ok) throw new Error("Failed to fetch news");

      const newData = await response.json();

      if (type === "scroll") {
        setGetTagNewsItemsData((prevData) => {
          const uniqueData = Array.from(
            new Map(
              [...prevData, ...newData.results].map((item) => [item.id, item])
            ).values()
          );

          return uniqueData;
        });
      } else {
        setGetTagNewsItemsData(newData.results);
      }

      setGetTagNewsItemsHasNext(newData.next !== null);
      setGetTagNewsItemsError(null);
    } catch (error) {
      setGetTagNewsItemsError(error.message);
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setGetTagNewsItemsIsLoading(false);
    }
  }, []);

  const fetchTags = useCallback(async () => {
    setGetTagItemsIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/tags`);

      if (!response.ok) throw new Error("Failed to fetch tags");

      const newData = await response.json();
      setGetTagItemsData(newData.results);

      setGetItemsError(null);
    } catch (error) {
      setGetTagItemsError(error.message);
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setGetTagItemsIsLoading(false);
    }
  }, []);

  const handleLikeDislike = useCallback(async (newsId, type, page) => {
    try {
      const response = await fetch(`${baseUrl}/like/${newsId}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({ action: type }),
      });

      if (!response.ok) throw new Error("Failed to update like/dislike");

      const { likes_count: likesCount, dislikes_count: dislikesCount } =
        await response.json();

      if (page === "list") {
        setGetItemsData((prevData) =>
          prevData.map((newsItem) =>
            newsItem.id === newsId
              ? { ...newsItem, likes: likesCount, dislikes: dislikesCount }
              : newsItem
          )
        );

        setGetTagNewsItemsData((prevData) =>
          prevData.map((newsItem) =>
            newsItem.id === newsId
              ? { ...newsItem, likes: likesCount, dislikes: dislikesCount }
              : newsItem
          )
        );
      } else {
        setGetSingleItemData((prevData) =>
          prevData.id === newsId
            ? { ...prevData, likes: likesCount, dislikes: dislikesCount }
            : prevData
        );
      }
    } catch (error) {
      console.log(error);
      handleMessage({ text: error.message, color: "danger" });
    }
  }, []);

  const handleDelete = useCallback(async (news_id) => {
    setDeleteIsLoading(true);
    setGetDeleteResponse(null);
    try {
      const response = await fetch(`${baseUrl}/delete/${news_id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      });

      if (response.ok) {
        setGetDeleteResponse("News deleted successfully");
        setDeleteError(null);
        setGetItemsData((prevItems) =>
          prevItems.filter((item) => item.id !== news_id)
        );
        handleMessage({ text: "News deleted successfully", color: "success" });
      } else {
        setDeleteError("Failed to delete news");
        handleMessage({ text: "Failed to delete news", color: "danger" });
      }
      setDeleteIsLoading(false);
    } catch (error) {
      setDeleteError("Failed to delete news");
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setDeleteIsLoading(false);
    }
  }, []);

  const postNews = useCallback(async (formData) => {
    setAddItemIsLoading(true);
    setAddItemResponse(null);
    setAddItemError(null);
    try {
      const response = await fetch(`${baseUrl}/create/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        handleMessage({ text: "Failed to post news", color: "danger" });
        throw new Error("Failed to post news");
      }

      setAddItemIsLoading(false);
      setAddItemResponse("News posted successfully");
      handleMessage({ text: "News posted successfully", color: "success" });
    } catch (error) {
      setAddItemError(error.message);
      handleMessage({ text: error.message, color: "danger" });
    } finally {
      setAddItemIsLoading(false);
    }
  }, []);

  const handleMessage = useCallback(async (messageData = {}, type = "set") => {
    if (type === "set") {
      setMessage(messageData);
    } else {
      setMessage({});
    }
  }, []);

  let contextData = {
    getItemsData,
    getItemsError,
    getItemsIsLoading,
    getItemsHasNext,
    fetchNews,

    getTagItemsData,
    getTagItemsError,
    getTagItemsIsLoading,
    fetchTags,

    getTagNewsItemsData,
    getTagNewsItemsError,
    getTagNewsItemsIsLoading,
    getTagNewsItemsHasNext,
    fetchTagNews,

    getSingleItemData,
    getSingleItemError,
    getSingleItemIsLoading,
    fetchNewsDetail,

    getDeleteResponse,
    getDeleteError,
    getDeleteIsLoading,
    handleDelete,

    addItemError,
    addItemIsLoading,
    addItemResponse,
    postNews,

    message,
    handleMessage,

    handleLikeDislike,
  };

  return (
    <NewsContext.Provider value={contextData}>{children}</NewsContext.Provider>
  );
};
