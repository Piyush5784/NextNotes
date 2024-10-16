import React, { ReactNode } from "react";

const FeatureCard = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex flex-col items-center space-y-2 
bg-gradient-to-r from-purple-400 to-violet-700
border-gray-300 dark:border-gray-800 p-6 rounded-lg bg-white shadow-md dark:bg-gray-800"
    >
      {children}
      {/* <Pencil className="h-8 w-8 mb-2 text-indigo-600 dark:text-indigo-400" />
  <h3 className="text-xl font-bold">Easy Note-Taking</h3>
  <p className=" text-center">
    Quickly jot down your thoughts with our intuitive interface.
  </p> */}
    </div>
  );
};

export default FeatureCard;
