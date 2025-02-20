import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from "axios";
interface City {
    id: number;
    city_name: string;
    temperature: number; // Temperature in Celsius
    createdAt: string;
}


const History = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [cities, setCities] = useState<City[]>([]);

    const toggleTab = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const handleHistoryApiCall = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/history");

            setCities(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
            }
        }
    }

    const handleDeleteHistory = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/history/delete/${id}`);
            const newList = cities.filter((city) => city.id != id);
            setCities(newList);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.message);
            }
        }
    }

    useEffect(() => {
        handleHistoryApiCall();
    }, [toggleTab])

    return (
        <div>

            <button
                onClick={toggleTab}
                className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer focus:outline-none"
            >
                {isOpen ? 'Close History' : 'Show History'}
            </button>

            <div
                className={`fixed bottom-0 left-0 w-full bg-white/50 shadow-lg rounded-t-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="flex justify-between items-center p-4 bg-gray-100/25">
                    <h3 className="text-xl font-semibold text-blue-600">User History</h3>
                    <button onClick={toggleTab} className="text-blue-700">Close</button>
                </div>

                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cities.length > 0 ? (
                        cities.map((city, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transform transition-all duration-200"
                            >
                                <h4 className="text-xl font-semibold text-gray-800">{city.city_name}</h4>
                                <p className="text-xl text-blue-600">{city.temperature}°C</p>
                                <div
                                    onClick={() => handleDeleteHistory(city.id)}
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-600 text-white rounded-l-lg p-2 cursor-pointer"
                                >
                                    Del
                                </div>
                            </div>
                        )).slice(0, 3)
                    ) : (
                        <p className="text-gray-500">No history.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
