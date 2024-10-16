"use client";
import React, { Dispatch, SetStateAction } from "react";

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  setIsDialogOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-gray-700">{description}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
