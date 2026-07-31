import type { IRegisterFormData } from "../schemas/auth.schema";

interface RegisterField {
  name: keyof IRegisterFormData;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
}

export const registerFields: RegisterField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];
