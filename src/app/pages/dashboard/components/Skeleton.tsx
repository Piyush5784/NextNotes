const Skeleton = () => {
  return (
    <>
      <div className="flex">
        <div className="animate-pulse flex h-screen flex-col px-3 py-4 md:px-2 w-60 ">
          <div className="mb-2 h-24 flex flex-col justify-between rounded-md bg-purple-700 p-4 md:h-40">
            <div className="flex items-center justify-between space-x-2 text-white">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 rounded w-8"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex grow flex-col justify-between mt-4 space-y-2">
            <div>
              <div className="h-4 p-6 bg-gray-200 rounded w->full mb-2"></div>
              <div className="h-4 p-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 p-6 bg-gray-200 rounded w-full mb-2"></div>

              <div className="h-4 p-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 p-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 p-6 bg-gray-200 rounded w-full mb-2"></div>
            </div>
            <div className="h-8 p-6 bg-gray-200 rounded w-full mb-2"></div>
          </div>
        </div>

        <div className="h-8 p-6 bg-gray-200 rounded mb-2 w-36 mt-5 ml-5"></div>

        <div className="h-8 p-6 bg-gray-200 rounded mb-2 w-36 mt-5 ml-[900px]"></div>
      </div>
    </>
  );
};

export default Skeleton;
