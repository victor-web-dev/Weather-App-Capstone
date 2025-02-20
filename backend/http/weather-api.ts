import "dotenv/config";
// import axios from "axios";

// const { WEATHER_API_FORECAST, KEY } = process.env

// export const weatherApi = axios.create({})

const { WEATHER_API_FORECAST, KEY } = process.env;
export const baseUrl = `${WEATHER_API_FORECAST}key=${KEY}`;