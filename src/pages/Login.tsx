import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../components/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { loginSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ** React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local", data);
      if (status === 200) {
        toast.success("You will navigate to the Home page after 2 seconds.", {
          position: "bottom-right",
          duration: 4000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data?.error?.message}`, {
        position: "bottom-right",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  // **  Renders
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    ),
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Login to get access!
      </h2>
      <form noValidate className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
