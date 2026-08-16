import type { User } from "@/types";
import type { LoginFormData } from "../model/login.schema";

export const login = async (data: LoginFormData): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const isUser =
    (data.identifier === "user@gmail.com" || data.identifier === "09121234567") &&
    data.password === "1234";

  if (isUser) {
    return {
      id: "1",
      name: "سارا احمدی",
      email: "user@gmail.com",
      role: "user",
    };
  }

  const isConsultant =
    (data.identifier === "consultant@gmail.com" ||
      data.identifier === "09120000002") &&
    data.password === "5678";

  if (isConsultant) {
    return {
      id: "2",
      name: "نرگس محمدی",
      email: "consultant@gmail.com",
      role: "consultant",
    };
  }

  throw new Error("INVALID_CREDENTIALS");
};
