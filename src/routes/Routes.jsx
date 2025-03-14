import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from '../pages/News/NewsList';
import NewsDetail from '../pages/News/NewsDetail';
import TagedNews from '../pages/News/TagedNews';
import CreateNews from '../pages/News/CreateNews';

const NavigationControl = () => {
  return (
    <Router>
        <Routes>
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:news_id/detail" element={<NewsDetail />} />
            <Route path="/news/tag/:tag_name/:tag_id" element={<TagedNews />} />
            <Route path="/news/create" element={<CreateNews />} />
        </Routes>
    </Router>   
  )
}

export default React.memo(NavigationControl)