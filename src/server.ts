import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import Database from "./core/data/connections/Database";
import UserRoutes from "./features/users/routes/Routes";
import MessageRoutes from "./features/messages/routes/Routes";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const db = new Database();

app.get("/", (req: Request, res: Response) => {
	res.send(`Server -> OK`);
});

const userRoutes = new UserRoutes().init();
const messageRoutes = new MessageRoutes().init();
app.use(userRoutes);
app.use(messageRoutes);

db.openConnection().then(() =>
	app.listen(PORT, () => console.log(`server started on port ${PORT}`))
);
