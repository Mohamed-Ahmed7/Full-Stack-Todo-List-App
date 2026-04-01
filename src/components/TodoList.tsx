import Button from "./ui/Button";

import type { ITodo } from "../interfaces";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import { useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../components/InputErrorMessage";
import { todoSchema } from "../validation";

const TodoList = () => {
  const emptyTodo: ITodo = {
    title: "",
    description: "",
  };
  const [todoToEdit, setTodoToEdit] = useState<ITodo>(emptyTodo);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  // ** React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITodo>({
    resolver: yupResolver(todoSchema),
  });
  // ** Handlers
  // ** Fetch Data By React Query
  const { isLoading, data, error } = useAuthenticatedQuery({
    queryKey: ["todoList", `${todoToEdit.documentId}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  const openEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenEditModal(true);
    reset({
      title: todo.title,
      description: todo.description,
    });
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
    setTodoToEdit(emptyTodo);
    reset(emptyTodo);
  };

  const onSubmit: SubmitHandler<ITodo> = async (todo) => {
    setIsUpdating(true);
    const { title, description } = todo;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        {
          data: { title, description },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        },
      );
      if (status === 200) {
        closeEditModal();
        toast.success("Todo Is Updated", {
          position: "bottom-right",
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onRemove = async (todo: ITodo) => {
    setIsUpdating(true);
    const { title, description } = todo;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        {
          data: { title, description },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        },
      );
      if (status === 200) {
        closeEditModal();
        toast.success("Todo Is Updated", {
          position: "bottom-right",
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-1">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.documentId}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className=" flex items-center justify-end w-full gap-x-3">
              <Button size={"sm"} onClick={() => openEditModal(todo)}>
                Edit
              </Button>
              <Button
                size={"sm"}
                variant={"danger"}
                onClick={() => onRemove(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )}
      {/* ******************* */}
      {/* <div className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 ">
        <p className="w-full font-semibold">title</p>
        <div className=" flex items-center justify-end w-full gap-x-3">
          <Button size={"sm"} onClick={openEditModal}>
            Edit
          </Button>
          <Button size={"sm"} variant={"danger"}>
            Remove
          </Button>
        </div>
      </div> */}
      {/* Edit Todo Modal  */}
      <Modal
        title="Edit This Todo"
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input {...register("title")} />
            <InputErrorMessage msg={errors.title?.message} />
          </div>
          <div>
            <Textarea {...register("description")} />
            <InputErrorMessage msg={errors.description?.message} />
          </div>
          <div className="flex gap-x-2 mt-4">
            <Button fullWidth isLoading={isUpdating}>
              Update
            </Button>
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
