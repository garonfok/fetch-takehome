import { useState } from "react";
import axios from "axios";

import { Banner } from "../components/banner";

// Get api url from .env file
const API_URL = "https://frontend-take-home-service.fetch.com";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.request({
        method: "POST",
        url: "/auth/login",
        baseURL: API_URL,
        data: {
          name,
          email,
        },
        withCredentials: true,
      });

      if (loginResponse.status === 200) {
        window.location.href = "/dashboard";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col text-[#300D38]">
        <Banner>
          <div className="text-2xl font-bold text-[#300D38]">
            Frontend Take-Home Exercise
          </div>
        </Banner>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray-100 w-96 rounded-md">
            <form
              onSubmit={handleSubmit}
              className="p-8 flex flex-col justify-center gap-8"
            >
              <h2 className="text-2xl font-semibold text-center mb-12">
                Welcome back!
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input
                    className="input"
                    type="text"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    className="input"
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <input type="submit" value="Log in" className="secondary-btn" />
            </form>
          </div>
        </div>
      </div>
      {isError && (
        <div className="absolute bottom-0 w-full">
          <div className="flex justify-center mb-20">
            <div className="px-3 py-2 bg-red-300 w-fit rounded-md text-red-900 flex gap-2">
              <span>An error occurred trying to log in. Please try again.</span>
              <button onClick={() => setIsError(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
