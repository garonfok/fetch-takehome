import { useRouteError } from "react-router-dom";

import Logo from "../assets/fetch/fetch-logo-light.svg";

const Error = () => {
  const error = useRouteError() as {
    status: number;
    statusText?: string;
    message?: string;
  };
  console.error(error);

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-gray-100 flex justify-center">
        <div className="flex justify-between py-4 items-center w-[36rem]">
          <a href="/">
            <img src={Logo} alt="Fetch Rewards Logo" className="h-12" />
          </a>

          <div className="text-2xl font-bold text-[#300D38]">
            Frontend Take-Home Exercise
          </div>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl text-center">An error occurred.</h1>
            <p className="text-center">
              {error.status}: {error.statusText || error.message}
            </p>
          </div>
          <a
            href="/"
            className="text-center px-3 py-2 hover:bg-[#890075] bg-[#FFA900] text-[#300D38] hover:text-white font-semibold rounded-md transition duration-50 ease-in-out"
          >
            Return to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
