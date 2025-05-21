import { useContext } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { authContext } from "../context/authContext";
import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const { login, isLoading, checkAuth } = useContext(authContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setError("");
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) return setError("Both fields are mandatory");
    try {
      await login(user.email, user.password);
      checkAuth();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleUser = (key) => (e) =>
    setUser({ ...user, [key]: e.target.value });
  return (
    <div
      className="bg-zinc-800 rounded-xl mt-10 mb-14
    pt-8 min-w-1/3 
   shadow-xl"
    >
      <h1
        className="text-white 
      text-3xl font-bold text-center"
      >
        Welcome Back
      </h1>
      <form className="px-8" onSubmit={handleLogin}>
        {/* Email field */}
        <div className="text-left">
          <Input
            placeholder={"Enter Name"}
            icon={Mail}
            value={user.email}
            onChange={handleUser("email")}
            type="email"
          />
        </div>

        {/* Password field */}
        <div className="text-left">
          <Input
            placeholder={"Enter Password"}
            icon={Lock}
            value={user.password}
            onChange={handleUser("password")}
            type="password"
          />
        </div>

        {/* Forgot Password */}
        <Link
          to="forgot-password"
          className="text-blue-500 hover:underline -mt-3 block"
        >
          Forgot password?
        </Link>
        <input type="submit" value="" />
        {error && (
          <p className="text-red-400 text-center italic -mt-2">* {error}</p>
        )}
        <div className="my-4">
          <button
            type="submit"
            className="bg-zinc-900 text-white p-4 w-full rounded-2xl text-base cursor-pointer hover:bg-zinc-950 transition-colors 
            duration-300"
          >
            {isLoading ? <Loader className="mx-auto animate-spin" /> : "Login"}
          </button>
        </div>
      </form>
      <div className="bg-zinc-700 rounded-b-2xl p-4 text-white text-center">
        <p>
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
