import express, { Request, Response } from "express";
import "reflect-metadata";
//import UserRoutes from './features/user/routes/Routes';
import UserRoutes from "./features/users/routes/Routes";
import MessageRoutes from "./features/messages/routes/Routes";

import Database from "./core/data/connections/Database";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("OK");
});

//const userRoutes = new UserRoutes().init();
const userRoutes = new UserRoutes().init();
const messageRoutes = new MessageRoutes().init();


app.use(userRoutes);
app.use(messageRoutes);


new Database()
	.openConnection()
	.then(() => app.listen(8080, () => console.log("Servidor Iniciado")));
