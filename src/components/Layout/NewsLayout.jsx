import React, { useState, useMemo } from "react";
import {Container } from "react-bootstrap";
import NavigationHeader from "../Navigations/NavigationHeader";
import Messages from "../Popup/Messages";
import Loading from "../Loading/Loading";

const NewsLayout = ({ children, dataLoading, }) => {

  const tags = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Entertainment' },
  ];

  const memoizedNavBarSection = useMemo(() => <NavigationHeader tags={tags}/>, []);

  const memoizedLoading = useMemo(() => <Loading />, []);

  const memoizedMessages = useMemo(() => (
      <Messages />
), []);

  return (
    <div>
      {memoizedNavBarSection}

      <Container className="mt-3 bg-white p-4">
        {!dataLoading ? (
          <div>
            {memoizedMessages}

            {children}
          </div>
        ) : (
          memoizedLoading
        )}
      </Container>
    </div>
  );
};

export default React.memo(NewsLayout);
