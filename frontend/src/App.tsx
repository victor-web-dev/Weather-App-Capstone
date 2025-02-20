
import searchIcon from "./assets/Search.svg";
import bkgVideo from "./assets/video/video.mp4";
import axios, { AxiosError } from "axios";
import { IForecastMinimal } from "./types/api.types";

import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { CardWeather } from "./components/CardWeather";
import { History } from "./components/History";

function App() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchData, setSearchData] = useState<IForecastMinimal>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }

  const handleApiCall = async (city: string) => {
    try {
      // get weather data from api
      const { data } = await axios.get(`http://localhost:3000/weather/${city}`);
      const res: IForecastMinimal = data.response;

      // save to history db
      await axios.post(`http://localhost:3000/history/save?city=${res.location.name}&temp=${res.current.temp_c}`);

      setSearchData(res);
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }

    }
  }

  const checkSearchInputMinChar = useCallback((): boolean => {
    return searchInput.length >= 3;
  }, [searchInput.length]);

  const handleEnterKey = useCallback((event: KeyboardEvent) => {

    if (event.key === 'Enter') {
      event.preventDefault();

      if (checkSearchInputMinChar()) {
        handleApiCall(searchInput);
      }
    }
  }, [checkSearchInputMinChar, searchInput]);

  const handleSubmitBtn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkSearchInputMinChar()) {
      handleApiCall(searchInput);
      return;
    }
    return;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.25;
    }

    window.addEventListener('keydown', handleEnterKey);

    return () => {
      window.removeEventListener('keydown', handleEnterKey);
    }

  }, [handleEnterKey, searchInput]);

  return (
    <>
      <main id="main-background" className="flex justify-center h-screen text-xl">

        <video ref={videoRef} autoPlay loop muted className="absolute z-0 top-0 left-0 w-full h-full object-cover">
          <source src={bkgVideo} type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 h-full w-full flex justify-center items-center bg-black/50">
          <section id="city-weather-info" className="h-full flex flex-col justify-center items-center">
            <div>
              <div>
                <h1 className="text-white text-7xl pb-4">City <span className="text-transparent bg-gradient-to-r from-blue-500 to-white bg-clip-text">Weather</span></h1>
              </div>
              <div>
                <form onSubmit={handleSubmitBtn} className="text-center">
                  <input type="text" id="search-input" value={searchInput} onChange={handleInputChange} placeholder='City name...' className="px-10 py-3 border-none outline-0  rounded-xl bg-white sm:w-lg md:w-2xl lg:w-4xl" />
                  <button type="submit" className="cursor-pointer p-4">
                    <img src={searchIcon} alt="search icon" className="" />
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-6">
              {/* all data for the city's weather comes here */}
              {
                searchData ? <CardWeather data={searchData} /> : ""
              }
            </div>
          </section>
          <section id="city-weather-history">
            <History />
          </section>
        </div>
      </main>
    </>
  )
}

export default App
