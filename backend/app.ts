import express, { Application, Request, Response } from "express";
import { forecast, history } from "./routes";
import cors from "cors";

export class App {

    private app: Application;

    constructor() {

        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.routes();
    }

    private routes(): void {

        this.app.use("/weather", forecast);

        this.app.use("/history", history);

        // route for testing connection
        this.app.get("/ping", (_req: Request, res: Response): void => {
            try {
                res.status(200).send("pong");
                return;
            } catch (error) {
                res.status(500).send("Not found");
                return;
            }
        });
    }

    public serverStart(PORT: number) {
        this.app.listen(PORT, () => {
            console.log(`Server listening on port:${PORT}`);
        });
    }
}