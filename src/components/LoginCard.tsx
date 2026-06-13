import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

export default function LoginCard() {
  return (
    <div className="card p-10 gap-2 min-w-100 auto">
      {/* Login Label */}
      <h2 className="text-5xl font-bold mb-10">Login</h2>

      {/* Login Form */}
      <div className="min-w-full flex flex-col gap-2">
        {/* E-mail */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 font-light" htmlFor="email-field">
            <Mail strokeWidth={1.5} size={20} /> E-MAIL ADDRESS
          </label>
          <input
            id="email-field"
            className="min-w-full text-2xl p-2 border border-white rounded"
            placeholder="name@example.com"
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
            type="password"
          />
        </div>
      </div>
      
      {/* Forgot Password Nav Link */}
      <Link className="self-end underline hover:opacity-70 mb-8" to="/">
        Forgot Password?
      </Link>

      {/* Login Button */}
      <button className="transition duration-200 ease-in cursor-pointer bg-blue-400 min-w-full text-2xl p-2 rounded shadow hover:shadow-[0_0_45px_rgba(34,211,238,1)]">Log In</button>

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
