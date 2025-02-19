import "dotenv/config"
import { App } from "./app";

const app = new App();
const PORT = Number(process.env.PORT);

app.serverStart(PORT);