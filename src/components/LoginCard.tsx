import { Mail, Lock } from "lucide-react";
import { Link, UNSAFE_ErrorResponseImpl } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { validUsers } from "../data/userCredentials.js";
import { setIsLoggedIn, setLoginError } from "../redux/authSlice.js";
import { useForm, type SubmitHandler } from "react-hook-form";

async function signIn(username: string, password: string) {
  const userFound = validUsers.some((user) => {
    return user.username === username && user.password === password;
  });

  return userFound;
}

const ERROR_MSG = "Entered incorrect/invalid credentials, please try again!";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  console.log("Rendered");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const loginError = useAppSelector((state) => state.authConfig.loginError);
  const dispatch = useDispatch();

  // const handleLogin = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   const isUserFound = await signIn(username, password);

  //   if (isUserFound) {
  //     localStorage.setItem("isLoggedIn", String(isUserFound));
  //     dispatch(setIsLoggedIn(true));
  //     dispatch(setLoginError(false));
  //     onSuccess();
  //   } else {
  //     dispatch(setIsLoggedIn(false));
  //     dispatch(setLoginError(true));
  //   }
  // };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isUserFound = await signIn(email, password);

    if (isUserFound) {
      localStorage.setItem("isLoggedIn", String(isUserFound));
      dispatch(setIsLoggedIn(true));
      dispatch(setLoginError(false));
      onSuccess();
    } else {
      dispatch(setIsLoggedIn(false));
      dispatch(setLoginError(true));
    }

    reset();
  };

  return (
    <div className="card p-10">
      {/* Login Label */}
      <h2 className="text-5xl font-bold mb-10">Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-full flex flex-col items-center gap-2 mb-2"
      >
        {/* Login Form */}
        <div className="min-w-full flex flex-col gap-2">
          {/* E-mail */}
          <div className="flex flex-col gap-1">
            <label
              className="flex items-center gap-1 font-light"
              htmlFor="email-field"
            >
              <Mail strokeWidth={1.5} size={20} /> E-MAIL ADDRESS
            </label>
            <input
              id="email-field"
              className="min-w-full text-2xl p-2 border border-white rounded"
              placeholder="test@email.com"
              type="email"
              {...register("email", {
                required: true,
              })}
            />

            {errors.email && <p>There was an error!</p>}
          </div>
          {/* Password */}
          <div className="min-w-full flex flex-col gap-2">
            <label
              className="flex items-center gap-1 font-light"
              htmlFor="password-field"
            >
              <Lock strokeWidth={1.5} size={20} /> PASSWORD{" "}
            </label>
            <input
              id="password-field"
              className="min-w-full text-2xl p-2 border border-white rounded"
              placeholder="password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
        </div>

        {/* Forgot Password Nav Link */}
        <Link className="self-end underline hover:opacity-70 mb-8" to="/">
          Forgot Password?
        </Link>

        <div className="min-w-full flex flex-col items-center gap-1">
          {loginError && <p className="text-red-500">{ERROR_MSG}</p>}
          {/* Login Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className={`${isSubmitting ? 'disabled opacity-50' : 'enabled hover:shadow-[0_0_45px_rgba(34,211,238,1)]'} transition duration-200 ease-in cursor-pointer bg-blue-400 text-2xl  p-2 min-w-full rounded shadow `}
          >
            LOG IN
          </button>
        </div>
      </form>

      {/* Sign-up Nav Link */}
      <p>
        Don't have an account?{" "}
        <Link to="/" className="underline hover:opacity-70">
          Sign up!
        </Link>
      </p>
    </div>
  );
}
