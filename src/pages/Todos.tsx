import TodoSkeleton from "../components/TodoSkeleton";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import type { ITodo } from "../interfaces";

const TodosPage = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // ** Fetch Data By React Query
  const { isLoading, data, error } = useCustomQuery({
    queryKey: ["paginatedTodos"],
    url: "/todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(data?.data);
  if (isLoading)
    return (
      <div className="space-y-1">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="max-w-2xl mx-auto space-y-3 px-4">
      {data.data.length ? (
        data.data.map(({documentId,title}: ITodo, idx: number) => (
          <div
            key={documentId}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
          >
            <h3 className="w-full font-semibold">
              {idx + 1} - {title}
            </h3>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )}
      <Paginator/>
    </div>
  );
};

export default TodosPage;
