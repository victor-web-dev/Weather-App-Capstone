import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const history = Router();
const prisma = new PrismaClient();

history.get("/", async (req: Request, res: Response) => {
    try {
        const data = await prisma.history.findMany();
        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(500).send({ error: "" });
        return;
    }
});

// should be /save?city=...&temp=...
history.post("/save", async (req: Request, res: Response) => {
    try {
        const { city, temp } = req.query;

        await prisma.history.create({
            data: {
                city_name: city as string,
                temperature: Number(temp),
            }
        })

        res.status(201).json({ city, temp });
        return;
    } catch (error) {
        res.status(500).send({ error: "" });
        return;
    }
});

history.delete("/delete/:id", (req: Request, res: Response) => { });



export { history }