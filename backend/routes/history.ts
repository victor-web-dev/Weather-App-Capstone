import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const history = Router();
const prisma = new PrismaClient();

history.get("/", async (req: Request, res: Response) => {
    try {
        const data = await prisma.history.findMany();
        res.status(200).json(data.sort((a, b) => (b.id - a.id)));
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

history.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.history.delete({ where: { id: Number(id) } })
        res.status(204).send();
        return;
    } catch (error) {
        res.status(500).send({ error: "" });
        return;
    }
});



export { history }