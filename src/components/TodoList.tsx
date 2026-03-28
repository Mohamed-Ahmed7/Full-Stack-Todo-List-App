import Button from "./ui/Button";

import type { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // ** Fetch by UseEffect [not best practice]
  // useEffect(() => {
  //   axiosInstance
  //     .get("/users/me?populate=todos", {
  //       headers: {
  //         Authorization: `Bearer ${userData.jwt}`,
  //       },
  //     })
  //     .then((res) => setTodos(res.data.todos))
  //     .catch((err) => console.error(err))
  //     .finally(() => setIsLoading(false));
  // }, [userData.jwt]);
  // ** Fetch Data By React Query
  const { isLoading, data, error } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className=" flex items-center justify-end w-full gap-x-3">
              <Button size={"sm"}>Edit</Button>
              <Button size={"sm"} variant={"danger"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )}
    </div>
  );
};

export default TodoList;
