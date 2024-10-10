import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-200"></div>
      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default LoadingDots;
