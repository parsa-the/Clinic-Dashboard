import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DotGrid from "@/components/ui/DotGrid";
import { login } from "../api/login";
import { loginSchema, type LoginFormData } from "../model/login.schema";
import { useAuthStore } from "../model/auth.store";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await login(data);

      loginUser(user);

      if (user.role === "consultant") {
        navigate("/consultant/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        toast.error("شماره موبایل / ایمیل یا رمز عبور اشتباه است");
        return;
      }

      toast.error("خطایی رخ داد. دوباره تلاش کنید.");
    }
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      {/* Background */}
      <div className="absolute z-1 inset-0">
        <DotGrid
          dotSize={2}
          gap={17}
          baseColor="#7f7f7f"
          activeColor="#00a2ff"
          proximity={120}
          shockRadius={100}
          shockStrength={40}
          resistance={2000}
          returnDuration={0.5}
        />
      </div>

      {/* Login container */}
      <div className="relative text-black z-10 flex min-h-dvh w-full items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            flex w-full max-w-lg flex-col
            gap-18 rounded-2xl
          
            border border-black/20  p-6 shadow-lg shadow-black/30 backdrop-blur-xs sm:p-8
          "
        >
          <div className="flex flex-col  gap-2">
            <h1 className="text-3xl font-bold text-black sm:text-4xl">ورود</h1>

            <p className="text-lg text-zinc-500">
              برای ادامه وارد حساب کاربری خود شوید.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="identifier" className="text-[17px]  font-medium ">
                شماره موبایل یا ایمیل
              </label>

              <input
                id="identifier"
                type="text"
                dir="ltr"
                autoComplete="username"
                placeholder="example@gmail.com"
                disabled={isSubmitting}
                {...register("identifier")}
                className="
                  h-11 w-full rounded-lg
                  border border-black/20
                  bg-black/10 px-3
                  text-sm
                  outline-none
                  transition
                  placeholder:text-zinc-400
                  focus:border-blue-400
                  focus:ring-2 focus:ring-blue-500/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />

              {errors.identifier && (
                <p className="text-sm text-red-600">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-4 ">
              <label htmlFor="password" className="text-[17px] font-medium">
                رمز عبور
              </label>

              <div className="relative">
                <button  onClick={()=>setPasswordVisible(!passwordVisible)} className="absolute top-2 right-3">
                 
                  {passwordVisible ? <Eye color="gray" /> : <EyeClosed color="gray"/>}
                </button>

                <input
                  id="password"
                  type={passwordVisible?"text":"password"}
                  dir="ltr"
                  autoComplete="current-password"
                  placeholder="*********"
                  disabled={isSubmitting}
                  {...register("password")}
                  className="
                  h-11 w-full rounded-lg
                  border border-black/20
                  bg-black/10 px-3
                  text-sm 
                  outline-none
                  transition
                  placeholder:text-zinc-400
                  focus:border-blue-400
                  focus:ring-2 focus:ring-blue-500/20
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                />
              </div>

              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              h-11 w-full rounded-lg
              bg-blue-600 px-4
              text-sm font-medium text-white
              transition-colors duration-200
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2 focus:ring-blue-400/50
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
