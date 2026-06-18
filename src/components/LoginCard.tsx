import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice.js";
import { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector.js";

export default function LoginCard() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isLoggedIn = useAppSelector((state) => state.authConfig.isLoggedIn);
  const loginError = useAppSelector((state) => state.authConfig.loginError);

  const dispatch = useDispatch();

  return (
    <div className="card p-10 gap-2">
      {/* Login Label */}
      <h2 className="text-5xl font-bold mb-10">Login</h2>

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
            placeholder="name@example.com"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
            type="email"
          />
        </div>

        {/* Password */}
        <div className="min-w-full flex flex-col gap-2">
          <label className="flex items-center gap-1 font-light" htmlFor="">
            <Lock strokeWidth={1.5} size={20} /> PASSWORD{" "}
          </label>
          <input
            className="min-w-full text-2xl p-2 border border-white rounded"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            type="password"
          />
        </div>
      </div>

      {/* Forgot Password Nav Link */}
      <Link className="self-end underline hover:opacity-70 mb-8" to="/">
        Forgot Password?
      </Link>

      <div className="min-w-full flex flex-col items-center gap-1">
        {loginError && <p className="text-red-500">Entered incorrect/invalid credentials, please try again!</p>}

        {/* Login Button */}
        <button
          className="transition duration-200 ease-in cursor-pointer bg-blue-400  text-2xl  p-2 min-w-full rounded shadow hover:shadow-[0_0_45px_rgba(34,211,238,1)]"
          onClick={() => {
            dispatch(signIn({ username: username, password: password}))
          }}
        >
          LOG IN
        </button>
      </div>

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
