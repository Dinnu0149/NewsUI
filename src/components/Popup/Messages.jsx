import React from "react";

const Messages = ({ text, color }) => {
  return (
    <div class={`alert alert-${color}`} role="alert">
      {text}
    </div>
  );
};

export default React.memo(Messages);
