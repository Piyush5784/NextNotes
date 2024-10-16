import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin text-primary rounded-full ">
        <Loader2 size={56} />
      </div>
    </div>
  );
};

export default Loader;
