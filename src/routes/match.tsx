import axios from "axios";
import { Banner } from "../components/banner";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "https://frontend-take-home-service.fetch.com";

const Match = () => {
  const location = useLocation();

  const [dog, setDog] = useState<Dog>();

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const { dogId } = location.state;

        const dogResponse = await axios.request({
          method: "POST",
          url: "/dogs",
          baseURL: API_URL,
          withCredentials: true,
          data: [dogId],
        });

        if (dogResponse.status === 200) setDog(dogResponse.data[0]);
      } catch (error: any) {
        console.error(error);
        window.location.href = "/login";
      }
    };

    fetchDog();
  }, []);

  const handleLogout = async () => {
    try {
      const logoutResponse = await axios.request({
        method: "POST",
        url: "/auth/logout",
        baseURL: API_URL,
        withCredentials: true,
      });

      if (logoutResponse.status === 200) window.location.href = "/login";
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Banner>
        <button
          className="text-2xl font-bold text-[#300D38] hover:text-[#890075]"
          onClick={handleLogout}
        >
          Log out
        </button>
      </Banner>

      <div className="w-full flex flex-col justify-center h-screen items-center bg-[#FFA900]">
        {dog && (
          <div className="flex-col flex w-[36rem] text-center gap-4 bg-white p-8 rounded-md">
            <h2 className="text-xl">Say Hello to your new dog!</h2>
            <div className="flex flex-col justify-center gal-2">
              <h1 className="text-4xl">{dog.name}</h1>
              <img
                src={dog.img}
                alt={dog.name}
                className="object-contain h-72"
              />
              <p className="text-xl">
                {dog.name} is a {dog.age}-year-old {dog.breed} who's currently
                in the zip code of {dog.zip_code}, and is looking for a new
                home!
              </p>
            </div>
            <Link to="/dashboard" className="primary-btn">
              Start over
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
