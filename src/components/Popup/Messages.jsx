import React, { useState, useEffect, useContext, useCallback } from "react";
import NewsContext from "../../contexts/NewsContex";

const Messages = () => {
  const { message = {}, handleMessage } = useContext(NewsContext);

  const [confirmationAction, setConfirmationAction] = useState(false);

  const handleConfirmationPopUps = useCallback(() => {
    setConfirmationAction(true);

    setTimeout(() => {
      handleMessage({}, "clear");
      setConfirmationAction(false);
    }, 5000);
  }, [handleMessage]);

  useEffect(() => {
    if (message.text) {
      handleConfirmationPopUps();
    }
  }, [message, handleConfirmationPopUps]);

  return (
    <>
      {confirmationAction ? (
        <div
          className={`alert alert-${message.color} mt-5 position-fixed start-50 translate-middle-x top-0 z-2`}
          role="alert"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          {message.text}
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Messages);
