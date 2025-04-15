import React from "react";
import { Loader } from "lucide-react";

const LoadingIcon = () => {
  return (
    <div>
      <Loader className="animate-spin w-12 h-12 text-gray-100" />
      </div>
  );
};

export default LoadingIcon;