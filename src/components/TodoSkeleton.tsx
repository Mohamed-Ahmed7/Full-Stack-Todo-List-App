const TodoSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 animate-pulse">
      <div>
        <div className="w-52 h-3 bg-gray-200 rounded-sm dark:bg-gray-200"></div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-200 w-16 "></div>
        <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-200 w-20 "></div>
      </div>
    </div>
  );
};

export default TodoSkeleton;
