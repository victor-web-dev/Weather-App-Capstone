import { Router, Request, Response } from "express";

const history = Router();


history.get("", (req: Request, res: Response) => { });

history.post("", (req: Request, res: Response) => { });

history.delete("", (req: Request, res: Response) => { });



export { history }