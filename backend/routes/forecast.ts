import { Request, Response, Router } from "express";
import { baseUrl } from "../http/weather-api";
import axios, { AxiosError } from "axios";
import "dotenv/config";
import { IForecastMinimal } from "../types/forecast.types";
import { weatherCleanup } from "../utils/weatherData-cleanup";

const forecast = Router();

forecast.get("/:location", async (req: Request, res: Response) => {
    try {
        const { location } = req.params;
        console.log("starting fetch");
        const { data } = await axios.get(`${baseUrl}&q=${location}&days=3`);
        const weatherMinimal: IForecastMinimal = weatherCleanup(data);
        res.status(200).json({ response: weatherMinimal });
        return;
    } catch (error) {
        if (error instanceof AxiosError) {
            res.status(<number>error.status).send(error.message);
            return;
        }
        res.status(500).send(error);
        return;
    }
})


export { forecast };