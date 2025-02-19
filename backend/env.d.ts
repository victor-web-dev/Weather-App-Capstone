declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            WEATHER_API_FORECAST: string,
            KEY: string,
        }
    }
}

export { }