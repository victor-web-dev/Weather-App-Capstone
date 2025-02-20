interface IForecastMinimal {
    location: {
        name: string,
        country: string,
    },
    current: {
        temp_c: number,
        condition: {
            text: string,
            icon: string,
            code: number
        },
    },
    forecast: {
        forecastday: Array<{
            date: string,
            day: {
                maxtemp_c: number,
                mintemp_c: number,
            }
        }>,

    }
}

export type { IForecastMinimal };