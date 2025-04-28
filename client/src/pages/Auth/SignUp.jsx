// IMPORTS
// React hooks
import { useState } from "react";
// React router
import { useNavigate, Link } from "react-router-dom";
// React icons
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
// Layout component
import AuthLayout from "../../components/layouts/AuthLayout";
// Utils
import { validateEmail } from "../../utils/helper.js";
// Profile photo selector component
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";

// ---------------------------------------------------------------------------------

const Signup = () => {
  // State variables
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle signup function
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim() === "") {
      setError("Full name is required");
      return;
    }

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
      setError("Password can't be < 8 characters long");
      return;
    }

    if (!confirmPassword) {
      setError("You need to confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  // Show/Hide password function
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // COMPONENT
  return (
    <AuthLayout>
      <div className="h-full flex flex-col justify-center md:h-full lg-[w-70%]">
        <h3 className="text-xl text-shadow-md text-black font-medium md:text-2xl lg:text-3xl xl:text-4xl cursor-default">
          Create an account
        </h3>
        <p className="text-xs text-black font-light mt-2 mb-6 md:mb-12 md:text-sm lg:text-base xl:text-lg cursor-default">
          Finance control with &copy;
          <span className="text-sm font-medium text-shadow-md bg-gradient-to-r from-black via-blue-800 to-indigo-900 bg-clip-text text-transparent md:text-base lg:text-lg xl:text-xl cursor-default">
            BudgetPal
          </span>
        </p>

        <div>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSignup}
          >
            {/* Full name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-sm md:text-base lg:text-lg font-light"
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                autoFocus
                className={`text-xs border border-gray-300 bg-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tertiary md:text-sm lg:text-base`}
              />
              {error?.toLowerCase().includes("full name") && (
                <p className="text-red-300 font-semibold text-xs mt-1 md:text-sm lg:text-base md:mt-2 cursor-default">
                  {error}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm md:text-base lg:text-lg font-light"
              >
                Email
              </label>

              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@email.com"
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
            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="password"
                  className="text-sm md:text-base lg:text-lg font-light"
                >
                  Password
                </label>
                {showPassword ? (
                  <IoEyeOff
                    className="text-sm md:text-base lg:text-lg cursor-pointer hover:text-gray-700 transition duration-200 "
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={togglePasswordVisibility}
                    aria-label="Hide password"
                  />
                ) : (
                  <IoEye
                    className="text-sm md:text-base lg:text-lg cursor-pointer hover:text-gray-700 transition duration-200 "
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={togglePasswordVisibility}
                    aria-label="Show password"
                  />
                )}
              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••"
                className={`text-xs border border-gray-300 bg-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tertiary md:text-sm lg:text-base ${
                  error === "Password is required" ||
                  error === "Password can't be < 8 characters long"
                    ? "border-2 border-red-300"
                    : ""
                }`}
              />

              {error === "Password is required" ||
              error === "Password can't be < 8 characters long" ? (
                <p className="text-red-300 font-semibold text-xs mt-1 md:text-sm lg:text-base md:mt-2 cursor-default">
                  {error}
                </p>
              ) : null}
            </div>
            {/* Confirm password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirmPassword"
                className="text-sm md:text-base lg:text-lg font-light"
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`text-xs border border-gray-300 bg-neutral-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-tertiary md:text-sm lg:text-base ${
                  error?.toLowerCase().includes("passwords do not match") ||
                  error === "You need to confirm your password"
                    ? "border-2 border-red-300"
                    : ""
                }`}
              />

              {error?.toLowerCase().includes("passwords do not match") ||
              error === "You need to confirm your password" ? (
                <p className="text-red-300 font-semibold text-xs mt-1 md:text-sm lg:text-base md:mt-2 cursor-default">
                  {error}
                </p>
              ) : null}
            </div>
            {/* Profile picture */}
            <div className="flex gap-4 items-center justify-start md:col-span-2">
              <ProfilePhotoSelector
                image={profilePicture}
                setImage={setProfilePicture}
              />
              <p className="text-xs md:text-sm lg:text-base cursor-default">
                Choose profile image
              </p>
            </div>

            <button
              className="text-xs bg-secondary text-white font-semibold py-2 mt-1 md:col-span-2 rounded-md shadow-sm hover:bg-primary transition duration-200 cursor-pointer md:text-sm lg:text-base"
              type="submit"
            >
              Sign up
            </button>
          </form>
          <p className="text-xs mt-2 md:text-sm lg:text-base lg:mt-4 font-light text-black cursor-default">
            Already have an account?{" "}
            <Link
              className="text-primary font-semibold cursor-pointer hover:underline decoration-1 decoration-primary underline-offset-4"
              to="/signin"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
