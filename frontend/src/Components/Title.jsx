import React from "react";

export default function Title({ text }) {
  return (
    <div className="w-full flex justify-center my-2">
      <h1 className="text-xl  md:text-xl font-bold  text-center">{text}</h1>
    </div>
  );
}
