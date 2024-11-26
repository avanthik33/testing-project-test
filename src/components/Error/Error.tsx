import React from "react";
import { ErrorProps } from "../interfaces";

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center  bg-red-100 p-4">
      <div className=" text-red-900 p-2">
        <h1 className="text-md font-bold text-center">{message}</h1>
      </div>
    </div>
  );
};

export default Error;
