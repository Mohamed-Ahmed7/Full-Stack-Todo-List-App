import Button from "./ui/Button";

import type { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "./ui/Input";
const TodoList = () => {
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    title: "",
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // ** Handlers
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    console.log(name );
    setTodoToEdit({
      ...todoToEdit,
      [name]: value,
    });
  };
  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
  };
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

  // if (isLoading) return "Loading...";
  // if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-1">
      {/* {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className=" flex items-center justify-end w-full gap-x-3">
              <Button size={"sm"} onClick={openEditModal}>
                Edit
              </Button>
              <Button size={"sm"} variant={"danger"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )} */}
      /////////////////////////
      <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 ">
        <p className="w-full font-semibold">title</p>
        <div className=" flex items-center justify-end w-full gap-x-3">
          <Button size={"sm"} onClick={openEditModal}>
            Edit
          </Button>
          <Button size={"sm"} variant={"danger"}>
            Remove
          </Button>
        </div>
      </div>
      {/* Edit Todo Modal  */}
      <Modal
        title="Edit This Todo"
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
      >
        <form onSubmit={submitHandler}>
          <Input value={"f"} onChange={onChangeHandler} />
          <div className="flex gap-x-2 mt-4">
            <Button fullWidth>Update</Button>
            <Button fullWidth variant={"cancel"} onClick={closeEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
