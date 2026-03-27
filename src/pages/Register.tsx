import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import { REGISTER_FORM } from "../data";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  // ** React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
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
  console.log(errors);
  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
