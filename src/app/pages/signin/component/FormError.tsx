import { FaExclamationTriangle } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

interface FormErroProps {
  message?: string;
  type: "success" | "error";
}

export const FormResponseMessage = ({ message, type }: FormErroProps) => {
  if (!message) {
    return null;
  }
  if (type == "success") {
    return (
      <>
        <div className="w-full bg-emerald-800 text-emerald-500 rounded flex items-center px-4 py-3 my-4">
          <SiTicktick className="h-5 w-5 mr-5" />
          {message}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full bg-destructive/15 text-destructive h-5 dark:bg-red-400 rounded flex items-center px-4 py-5 my-4">
        <FaExclamationTriangle className="h-5 w-5 mr-5" />
        {message}
      </div>
    </>
  );
};
