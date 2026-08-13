import type { User  } from "../../types";
import type { LoginFormData } from "./login.schema";


export const login = async (data: LoginFormData): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (data.email === "user@gmail.com" && data.password === "1234")
    return {
      id: "1",
      name: "سارا احمدی",
      email: data.email,
      role: "user",
    };
  else if (data.email === "consultant@gmail.com" && data.password === "5678")
    return {
      id: "2",
      name: "نرگس محمدی",
      email: data.email,
      role: "consultant",
    };
  throw new Error("INVALID_CREDENTIALS");
};
