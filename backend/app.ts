import express, { Application, Request, Response } from "express";


export class App {

    private app: Application;

    constructor() {

        this.app = express();
        this.app.use(express.json());

        this.routes();
    }

    private routes(): void {
        // route for testing connection
        this.app.get("/ping", (_req: Request, res: Response): void => {
            try {
                res.status(200).send("pong");
                return;
            } catch (error) {
                res.status(404).send("Not found");
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