import { useState, useContext } from "react";
import { UserRound, Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { authContext } from "../context/authContext";

const SignUpPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ username: false, email: false });
  const { signup, isLoading, error: isError } = useContext(authContext);
  const navigate = useNavigate();
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleUser = (key) => (e) => {
    setUser({ ...user, [key]: e.target.value });
    if (key === "password") e.target.value;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    const error = {
      username: !(name.length > 6),
      email: !emailReg.test(email),
      password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(
        password
      ),
    };
    if (error.username || error.email || error.password) return setError(error);
    try {
      await signup(user);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-zinc-800 rounded-xl mt-10 mb-14
    pt-8 min-w-1/3 
    text-center shadow-xl"
    >
      <h1
        className="text-white 
      text-3xl font-bold"
      >
        Create Account
      </h1>
      <form className="px-8" onSubmit={handleSignup}>
        {/* Username field */}
        <div className="text-left text-red-400">
          <Input
            placeholder={"Enter Name"}
            icon={UserRound}
            value={user.name}
            onChange={handleUser("name")}
            type="text"
          />
          {error.username && (
            <p className="-mt-4">
              Username should be minimum of 6 characters length
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="text-red-400 text-left ">
          <Input
            placeholder={"Enter Email"}
            icon={Mail}
            value={user.email}
            onChange={handleUser("email")}
            type="email"
          />
          {error.email && <p className="-mt-4">Enter valid email</p>}
        </div>

        {/* Password field*/}
        <Input
          placeholder={"Enter Password"}
          icon={Lock}
          value={user.password}
          onChange={handleUser("password")}
          type="password"
        />

        <PasswordStrengthMeter password={user.password} />

        <div className="my-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-zinc-950 text-white p-4 w-full rounded-2xl text-base cursor-pointer 
          disabled:opacity-75"
          >
            {isLoading ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
      </form>

      <div className="bg-zinc-700 rounded-b-2xl p-4 text-white">
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
