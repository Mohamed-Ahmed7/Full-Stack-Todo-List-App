import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  // ** Hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // ** React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) });
  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 2 seconds to login.",
          {
            position: "bottom-right",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          },
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data?.error?.message}`, {
        position: "bottom-right",
        duration: 1500,
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
  const renderRegisterForm = REGISTER_FORM.map(
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
        Register to get access!
      </h2>
      <form noValidate className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* <div>
          <Input
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 5,
            })}
          />
          {errors?.username && errors.username.type === "required" && (
            <InputErrorMessage msg="Username is required." />
          )}
          {errors?.username && errors.username.type === "minLength" && (
            <InputErrorMessage msg="Username should be at-least 5 characters." />
          )}
        </div>
        <div>
          <Input
            placeholder="Email"
            {...register("email", {
              required: "Email is required.",
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors?.email && errors.email.type === "required" && (
            <InputErrorMessage msg="Email is required." />
          )}
          {errors?.email && errors.email.type === "pattern" && (
            <InputErrorMessage msg="Email is not valid." />
          )}
        </div>
        <div>
          <Input
            placeholder="Password"
            {...register("password", {
              required: "Password is required.",
              minLength: 6,
            })}
          />
          {errors?.password && errors.password.type === "required" && (
            <InputErrorMessage msg="Password is required." />
          )}
          {errors?.password && errors.password.type === "minLength" && (
            <InputErrorMessage msg="Password should be at-least 6 characters." />
          )}
        </div> */}
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
