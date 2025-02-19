import { IForecastMinimal, IFullForecast } from "../types/forecast.types";



export const weatherCleanup = (data: IFullForecast): IForecastMinimal => {
    return {
        location: {
            name: data.location.name,
            country: data.location.country,
        },
        current: {
            temp_c: data.current.temp_c,
            condition: {
                text: data.current.condition.text,
                icon: data.current.condition.icon,
                code: data.current.condition.code
            },
        },
        forecast: {
            forecastday: data.forecast.forecastday.map((fday) => ({
                date: fday.date,
                day: {
                    maxtemp_c: fday.day.maxtemp_c,
                    mintemp_c: fday.day.mintemp_c
                }
            }))

        }
    }
}