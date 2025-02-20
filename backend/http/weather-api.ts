import "dotenv/config";

const { WEATHER_API_FORECAST, KEY } = process.env;
export const baseUrl = `${WEATHER_API_FORECAST}key=${KEY}`;