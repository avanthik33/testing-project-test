import { useState } from "react";
import { Link } from "react-router-dom";
import { signinFormData } from "../../interfaces";
import { useSignin } from "../../hooks/useSignin";
import Error from "../../components/Error/Error";
import CircularProgress from "@mui/material/CircularProgress";

const Signin: React.FC = () => {
  const [formData, setFormdata] = useState<signinFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevInput) => ({
      ...prevInput,
      [event.target.name]: event.target.value,
    }));
  };

  const { error, loading, signin } = useSignin({ formData });

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    signin();
  };

  return (
    <>
      {error && <Error message={error} />}
      <div className="flex items-center justify-center  bg-gray-700 h-screen">
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form role="form" className="space-y-6" onSubmit={formSubmitHandler}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={
                !!loading || formData.email === "" || formData.password === ""
              }
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Login to your account"
              )}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?
              <Link
                to="signup"
                className="text-blue-700 ml-2 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
