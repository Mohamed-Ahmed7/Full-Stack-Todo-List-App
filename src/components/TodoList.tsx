import Button from "./ui/Button";

import type { IErrorResponse, ITodo } from "../interfaces";
import useCustomQuery from "../hooks/useCustomQuery";
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
import TodoSkeleton from "./TodoSkeleton";
import { faker } from "@faker-js/faker";

const TodoList = () => {
  const emptyTodo: ITodo = {
    title: "",
    description: "",
  };
  const [todo, setTodo] = useState<ITodo>(emptyTodo);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>(emptyTodo);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [queryVersion, setQueryVersion] = useState(1);
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
  const { isLoading, data, error } = useCustomQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  // ** Add Modal
  const openAddModal = () => {
    setIsOpenAddModal(true);
    setTodo(todo);
  };
  const closeAddModal = () => {
    setIsOpenAddModal(false);
    setTodo(emptyTodo);
  };
  // ** Edit Modal
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

  // ** Delete Modal
  const openConfirmModal = (todo: ITodo) => {
    setIsOpenConfirmModal(true);
    setTodoToEdit(todo);
  };
  const CloseConfirmModal = () => setIsOpenConfirmModal(false);
  const onSubmit: SubmitHandler<ITodo> = async (todo) => {
    setIsUpdating(true);
    const { title, description } = todo;
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
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
        closeAddModal();
        setQueryVersion((prev) => prev + 1);
        toast.success("Todo has been added successfully!", {
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
  const onSubmitEdit: SubmitHandler<ITodo> = async (todo) => {
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
        setQueryVersion((prev) => prev + 1);
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
  const onRemove = async () => {
    setIsRemove(true);
    try {
      const { status } = await axiosInstance.delete(
        `/todos/${todoToEdit.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        },
      );
      if (status === 204) {
        CloseConfirmModal();
        setQueryVersion((prev) => prev + 1);
        toast.success("Todo Is Deleted", {
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
      setIsRemove(false);
    }
  };
  const onGenerateTodos = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        const { data } = await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(4),
              description: faker.lorem.paragraph(2),
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
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
    <div className="space-y-1 px-4">
      <div className="w-fit mx-auto my-10 ">
        {isLoading ? (
          <div className="flex items-center gap-x-2 animate-pulse">
            <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-200 w-32 "></div>
            <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-200 w-32 "></div>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button size={"sm"} onClick={openAddModal}>
              Post new todo
            </Button>
            <Button size={"sm"} variant={"outline"} onClick={onGenerateTodos}>
              Generate todos
            </Button>
          </div>
        )}
      </div>
      {data.todos.length ? (
        data.todos.map((todo: ITodo, idx: number) => (
          <div
            key={todo.documentId}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
          >
            <p className="w-full font-semibold">
              {idx + 1} - {todo.title}
            </p>
            <div className=" flex items-center justify-end w-full gap-x-3">
              <Button size={"sm"} onClick={() => openEditModal(todo)}>
                Edit
              </Button>
              <Button
                size={"sm"}
                variant={"danger"}
                onClick={() => openConfirmModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todos yet!</h3>
      )}
      {/* Add Modal  */}
      <Modal
        title="Add a New Todo"
        isOpen={isOpenAddModal}
        closeModal={closeAddModal}
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
              Done
            </Button>
            <Button
              type="button"
              fullWidth
              variant={"cancel"}
              onClick={closeAddModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Edit Modal  */}
      <Modal
        title="Edit This Todo"
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
      >
        <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-3">
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
            <Button
              type="button"
              fullWidth
              variant={"cancel"}
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Delete Todo Modal  */}
      <Modal
        title="Delete This Todo"
        description="This action cannot be undone. Are you sure you want to delete this todo?"
        isOpen={isOpenConfirmModal}
        closeModal={CloseConfirmModal}
      >
        <div className="flex gap-x-2 mt-4">
          <Button
            fullWidth
            variant={"danger"}
            isLoading={isRemove}
            onClick={onRemove}
          >
            Yes, Remove
          </Button>
          <Button
            type="button"
            fullWidth
            variant={"cancel"}
            onClick={CloseConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
