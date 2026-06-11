import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

export default function LoginCard() {
  return (
    <div className="card">
      {/* Login Label */}
      <h2 className="text-2xl font-bold">Login</h2>

      {/* Login Form */}
      <div>
        {/* E-mail */}
        <div>
          <label className="flex items-center gap-1" htmlFor="email-field">
            <Mail strokeWidth={1.5} size={20}/> E-MAIL ADDRESS
          </label>
          <input id='email-field' className="min-w-full p-1 border border-white rounded" type="email" />
        </div>

        {/* Password */}
        <div>
          <label htmlFor=""><Lock/> PASSWORD </label>
          <input className="border border-white rounded" type="password" />
        </div>
      </div>

      {/* Forgot Password Nav Link */}
      <Link className='underline hover:opacity-70' to="/">Forgot Password?</Link>

      {/* Login Button */}
      <button className="border">Login</button>

      {/* Sign-up Nav Link */}
      <p>Don't have an account? <Link to="/" className="underline">Sign up!</Link></p>
    </div>
  );
}
