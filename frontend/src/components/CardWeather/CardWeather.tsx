import { IForecastMinimal } from "../../types/api.types";
import { formatDate } from "../../utils/formatDate";

type CardProps = {
    data: IForecastMinimal;
};

const CardWeather = (props: CardProps) => {

    const { data } = props;

    return (
        <>
            <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">{data.location.name}</h1>
                    <p className="text-gray-200">{data.location.country}</p>
                    <p className="text-lg text-white">
                        <img src={data.current.condition.icon} className="mx-auto" alt="icon" />
                        {data.current.condition.text}
                    </p>
                    <p className="text-4xl font-semibold text-blue-200">{data.current.temp_c}°C</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {data.forecast.forecastday.map((day, index) => (
                        <div
                            key={index}
                            className="p-4 bg-blue-200 rounded-lg shadow-md text-center"
                        >
                            <h3 className="text-2xl font-semibold text-gray-700">{formatDate(day.date)}</h3>
                            <p className="text-xl text-gray-800">Max: {day.day.maxtemp_c}°C</p>
                            <p className="text-xl text-gray-800">Min: {day.day.mintemp_c}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CardWeather;