import type { ILoginInput, IRegisterInput, ITodo } from "../interfaces";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "identifier",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const todos: ITodo[] = [
  {
    title: "title one ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, dicta! Accusantium inventore, distinctio nisi maxime adipisci dolore cumque magnam quas.",
    completed: false,
  },
  {
    title: "title 2 ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, dicta! Accusantium inventore, distinctio nisi maxime adipisci dolore cumque magnam quas.",
    completed: false,
  },
  {
    title: "title 3 ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, dicta! Accusantium inventore, distinctio nisi maxime adipisci dolore cumque magnam quas.",
    completed: false,
  },
  {
    title: "title 4 ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, dicta! Accusantium inventore, distinctio nisi maxime adipisci dolore cumque magnam quas.",
    completed: false,
  },
  {
    title: "title 5 ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, dicta! Accusantium inventore, distinctio nisi maxime adipisci dolore cumque magnam quas.",
    completed: false,
  },
];
