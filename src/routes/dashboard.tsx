import axios from "axios";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "../utils/debounce";
import { Combobox, Disclosure, Listbox, Switch } from "@headlessui/react";
import classNames from "classnames";
import { Banner } from "../components/banner";
import { useNavigate } from "react-router-dom";

const API_URL = "https://frontend-take-home-service.fetch.com";

const Dashboard = () => {
  const [dogbreeds, setDogbreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>();
  const [ageMax, setAgeMax] = useState<number>();
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(25);
  const [from, setFrom] = useState(0);
  const sortOptions = [
    { name: "Name", value: "name" },
    { name: "Age", value: "age" },
    { name: "Breed", value: "breed" },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[2]);
  const [isOrderAsc, setIsOrderAsc] = useState(true);

  const [searchResponseData, setSearchResponseData] = useState<{
    next?: string;
    resultIds: string[];
    total: number;
    prev?: string;
  }>({ resultIds: [], total: 0 });
  const [searchResults, setSearchResults] = useState<Dog[]>([]);

  const [dogSelection, setDogSelection] = useState<
    { id: string; name: string }[]
  >([]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const dogBreedsResponse = await axios.request({
          method: "GET",
          url: "/dogs/breeds",
          baseURL: API_URL,
          withCredentials: true,
        });

        setDogbreeds(dogBreedsResponse.data);
      } catch (error) {
        window.location.href = "/login";
      }
    };
    fetchDogBreeds();
  }, []);

  const handleBreedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBreedChangeDebounced = useCallback(
    debounce(handleBreedChange),
    []
  );

  const handleZipcodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const zipCodes = e.target.value.replace(/ /g, "").split(",");
    setZipCodes(zipCodes);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleZipcodeChangeDebounced = useCallback(
    debounce(handleZipcodeChange),
    []
  );

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

  const searchMatches = async () => {
    const params = {
      breeds: selectedBreeds,
      zipCodes: zipCodes.filter((zipCode) => zipCode !== ""),
      ageMin,
      ageMax,
      size,
      from,
      sort: `${sortBy.value}:${isOrderAsc ? "asc" : "desc"}`,
    };

    try {
      const searchResponse = await axios.request({
        method: "GET",
        url: "/dogs/search",
        baseURL: API_URL,
        withCredentials: true,
        params,
      });

      setSearchResponseData(searchResponse.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSearches = async () => {
      const resultIds = searchResponseData.resultIds;

      try {
        const matchResponse = await axios.request({
          method: "POST",
          url: "/dogs",
          baseURL: API_URL,
          withCredentials: true,
          data: resultIds,
        });

        setSearchResults(matchResponse.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchSearches();
  }, [searchResponseData]);

  const removeDogBreed = (dog: string) => {
    const prevSelection = [...selectedBreeds].filter((breed) => breed !== dog);
    setSelectedBreeds(prevSelection);
  };

  const handleDogSelection = (dog: { id: string; name: string }) => {
    const prevSelection = [...dogSelection];

    if (prevSelection.map((dog) => dog.id).includes(dog.id)) {
      const index = prevSelection.indexOf(dog);
      prevSelection.splice(index, 1);
    } else {
      prevSelection.push(dog);
    }
    setDogSelection(prevSelection);
  };

  const handlePageChange = async (url: string) => {
    // Replace %3A with :
    const formattedURL = url.replace(/%3A/g, ":");

    console.log(formattedURL)

    try {
      const searchResponse = await axios.request({
        method: "GET",
        url: formattedURL,
        baseURL: API_URL,
        withCredentials: true,
      });

      setSearchResponseData(searchResponse.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const findMatch = async () => {
    const dogIds = dogSelection.map((dog) => dog.id);

    try {
      const matchResponse = await axios.request({
        method: "POST",
        url: "/dogs/match",
        baseURL: API_URL,
        withCredentials: true,
        data: dogIds,
      });

      if (matchResponse.status === 200) {
        console.log(matchResponse.data);
        nav("/match", { state: { dogId: matchResponse.data.match } });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const filteredDogs =
    query === ""
      ? dogbreeds
      : dogbreeds.filter((dog) => {
          return dog.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="h-full min-h-screen flex flex-col w-full bg-sky-200">
      <Banner>
        <button
          className="text-2xl font-bold text-[#300D38] hover:text-[#890075]"
          onClick={handleLogout}
        >
          Log out
        </button>
      </Banner>
      <div className="w-full flex justify-center">
        <div className="w-[36rem] my-8 flex items-center flex-col justify-center gap-8">
          <div className="w-full text-2xl font-semibold">
            Find your canine companion today!
          </div>
          {/* Search bars */}
          <form className="flex flex-col w-full gap-2">
            {/* Breed */}
            <div className="flex flex-col w-full">
              <span>Dog breed</span>
              <Combobox
                value={selectedBreeds}
                onChange={(value) => {
                  setSelectedBreeds(value);
                }}
                multiple
              >
                {selectedBreeds.length > 0 && (
                  <ul className="flex gap-1 flex-col">
                    {selectedBreeds.map((dog) => (
                      <li
                        className="px-2 py-1 text-sm bg-[#300D38] text-white rounded-md w-fit flex items-center gap-2"
                        key={dog}
                      >
                        <button onClick={() => removeDogBreed(dog)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        {dog}
                      </li>
                    ))}
                  </ul>
                )}
                <Combobox.Input
                  onChange={handleBreedChangeDebounced}
                  className="input"
                />
                <div className="relative">
                  <Combobox.Options className="bg-white w-full rounded-md overflow-y-scroll border mt-2 max-h-72 absolute">
                    {filteredDogs.map((dog) => (
                      <Combobox.Option
                        key={dog}
                        value={dog}
                        className={({ selected }) =>
                          classNames(
                            "w-full px-3 py-2 hover:bg-[#890075] hover:text-white cursor-pointer",
                            selected && "bg-[#FFA900]"
                          )
                        }
                      >
                        {dog}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
            {/* Zip Code */}
            <div className="flex flex-col w-full">
              <label htmlFor="zipCodes">Zip code(s)</label>
              <input
                id="zipCodes"
                type="text"
                className="input"
                placeholder="11111, 22222, 33333"
                onChange={handleZipcodeChangeDebounced}
              />
            </div>
            {/* Age */}
            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="ageMin">Minimum age</label>
                <input
                  id="ageMin"
                  type="number"
                  className="input"
                  min={0}
                  onChange={(e) => setAgeMin(parseInt(e.target.value))}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="ageMax">Maximum age</label>
                <input
                  id="ageMax"
                  type="number"
                  className="input"
                  min={0}
                  onChange={(e) => setAgeMax(parseInt(e.target.value))}
                />
              </div>
            </div>
          </form>

          <Disclosure>
            <div className="w-full bg-white rounded-md flex flex-col gap-2 overflow-hidden shadow-md">
              <Disclosure.Button className="px-3 py-2 w-full flex justify-between">
                Advanced search settings
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="bg-slate-300 px-3 py-2">
                <form className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="size">Results per page</label>
                    <input
                      id="size"
                      type="number"
                      defaultValue={size}
                      min={1}
                      className="input"
                      onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="from">Starting index</label>
                    <input
                      id="from"
                      type="number"
                      defaultValue={from}
                      min={0}
                      className="input"
                      onChange={(e) => setFrom(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <span>Order by</span>
                    <div className="flex items-center gap-2 w-full">
                      <Listbox value={sortBy} onChange={setSortBy}>
                        <div className="flex flex-col w-full">
                          <div className="flex gap-2">
                            <Listbox.Button className="input">
                              {sortBy.name}
                            </Listbox.Button>
                            <Switch
                              checked={isOrderAsc}
                              onChange={setIsOrderAsc}
                            >
                              {isOrderAsc ? (
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
                                    d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                                  />
                                </svg>
                              ) : (
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
                                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                                  />
                                </svg>
                              )}
                            </Switch>
                          </div>
                          <div className="relative">
                            <Listbox.Options className="bg-white w-full rounded-md border mt-2 overflow-hidden">
                              {sortOptions.map((option) => (
                                <Listbox.Option
                                  key={option.value}
                                  value={option}
                                  className={({ selected }) =>
                                    classNames(
                                      "w-full px-3 py-2 hover:bg-[#890075] hover:text-white cursor-pointer",
                                      selected && "bg-[#FFA900]"
                                    )
                                  }
                                >
                                  {option.name}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </div>
          </Disclosure>

          <button onClick={searchMatches} className="primary-btn">
            Search Dogs
          </button>
          <div className="flex flex-col w-full gap-2">
            {/* Dog Selection */}
            <div className="w-full bg-white rounded-md px-3 py-2 flex flex-col">
              <span className="text-lg mb-2">Currently selected dogs:</span>
              {dogSelection.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {dogSelection.map((dog) => (
                    <li
                      key={dog.id}
                      className="px-2 py-1 text-sm bg-[#300D38] text-white rounded-md w-fit flex items-center gap-2"
                    >
                      <button onClick={() => handleDogSelection(dog)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      {dog.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-sm">
                  Nothing selected yet. Select some dogs to find your partner
                  today!
                </span>
              )}
            </div>
            {/* Dog list */}
            {searchResults.length > 0 && (
              <ul className="flex flex-col gap-4 w-full">
                {searchResults.map((dog) => (
                  <button
                    onClick={() =>
                      handleDogSelection({ id: dog.id, name: dog.name })
                    }
                  >
                    <li
                      key={dog.id}
                      className={classNames(
                        "flex gap-2 text-left p-2 rounded-md hover:bg-[#890075] hover:text-white transition duration-[50ms] ease-in-out",
                        dogSelection.map((dog) => dog.id).includes(dog.id)
                          ? "bg-[#FFA900] text-white"
                          : "bg-white"
                      )}
                    >
                      <img src={dog.img} className="object-cover h-32 w-32" />
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold">
                          {dog.name}
                        </span>
                        <span className="">
                          {dog.breed}, {dog.age} years old
                        </span>
                        <span>{dog.zip_code}</span>
                      </div>
                    </li>
                  </button>
                ))}
              </ul>
            )}
            {/* Pagination */}
            <div className="w-full flex justify-between gap-4">
              {searchResponseData && searchResponseData.prev && (
                <button
                  onClick={() =>
                    handlePageChange(searchResponseData.prev as string)
                  }
                  className="secondary-btn"
                >
                  Previous
                </button>
              )}
              {searchResponseData && searchResponseData.next && (
                <button
                  onClick={() =>
                    handlePageChange(searchResponseData.next as string)
                  }
                  className="secondary-btn"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {dogSelection.length > 0 && (
            <button onClick={findMatch} className="primary-btn">
              Find me a match!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
