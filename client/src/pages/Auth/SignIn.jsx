// IMPORTS
// React hooks
import { useState } from "react";
// React router
import { useNavigate, Link } from "react-router-dom";
// React icons
import { IoEye } from "react-icons/io5";
// Layout component
import AuthLayout from "../../components/layouts/AuthLayout";
// Utils
import { validateEmail } from "../../utils/helper.js";

// ---------------------------------------------------------------------------------

// COMPONENT
const Signin = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
  };

  // Show/Hide password function
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout>
      <div className="h-full flex flex-col justify-center md:h-full lg-[w-70%]">
        <h3 className="text-xl text-shadow-md text-black font-medium md:text-2xl lg:text-3xl xl:text-4xl cursor-default">
          Welcome back
        </h3>
        <p className="text-xs text-black font-light mt-2 mb-6 md:text-sm lg:text-base xl:text-lg cursor-default">
          Enter your credentials to sign in
        </p>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm md:text-base lg:text-lg font-light"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@mail.com"
                autoFocus
                className={`text-xs border border-gray-300 bg-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tertiary md:text-sm lg:text-base ${
                  error?.toLowerCase().includes("email")
                    ? "border-2 border-red-300"
                    : ""
                }`}
              />
              {error?.toLowerCase().includes("email") && (
                <p className="text-red-300 font-semibold text-xs mt-1 md:text-sm lg:text-base md:mt-2 cursor-default">
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="password"
                  className="text-sm md:text-base lg:text-lg font-light"
                >
                  Password
                </label>
                <IoEye
                  className={`text-sm md:text-base lg:text-lg cursor-pointer hover:text-gray-700 transition duration-200 ${
                    showPassword ? "text-primary" : ""
                  }`}
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={togglePasswordVisibility}
                />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className={`text-xs border border-gray-300 bg-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tertiary md:text-sm lg:text-base ${
                  error?.toLowerCase().includes("password")
                    ? "border-2 border-red-300"
                    : ""
                }`}
              />

              {error?.toLowerCase().includes("password") && (
                <p className="text-red-300 font-semibold text-xs mt-1 md:text-sm lg:text-base md:mt-2 cursor-default">
                  {error}
                </p>
              )}
            </div>

            <button
              className="text-xs bg-secondary text-white font-semibold py-2 mt-1 rounded-md shadow-sm hover:bg-primary transition duration-200 cursor-pointer md:text-sm lg:text-base"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <p className="text-xs mt-2 md:text-sm lg:text-base lg:mt-4 font-light text-black cursor-default">
            Don't have an account?{" "}
            <Link
              className="text-primary font-semibold cursor-pointer hover:underline decoration-1 decoration-primary underline-offset-4"
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signin;
