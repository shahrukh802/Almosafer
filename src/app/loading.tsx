import { Loader } from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full m-auto">
      <Loader />
    </div>
  );
};

export default Loading;
