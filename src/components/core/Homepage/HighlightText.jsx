import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-[#ff4ecd] via-[#0070f3] via-30% via-[#00c6ff] via-60% to-[#f9cb28] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;