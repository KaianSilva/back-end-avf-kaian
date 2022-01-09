import { Request, Response } from "express";
import Database from "../../../core/data/connections/Database";
import { User } from "../../../core/data/database/entities/User";

export default class UserController {
	
	public async store(req: Request, res: Response) {
		const { name, pass } = req.body;

		const user: User = await new User(name, pass).save();

		console.log(user);

		return res.status(200).json(user);
	}

	public async index(req: Request, res: Response) {
		const users = await User.find();

		return res.json(users);
	}

	public async view(req: Request, res: Response) {
		const { uid } = req.params;

		const user: User | undefined = await User.findOne(uid);

		return res.json(user);
	}

	public async update(req: Request, res: Response) {
		const { uid } = req.params;

		const { name, pass } = req.body;
		const user = await User.findOne(uid);

		if (name && pass) {
			const user = await new User(name,pass, uid).save();

			return res.status(200).send("usuário atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const { uid } = req.params;

		const user = await User.findOne(uid);

		if(user) {
			const result = await User.remove(user);
			
			console.log(result);

			return res.status(200).send("usuário excluída com sucesso");
		} else {
			return res.status(404).send('usuário não encontrado')
		}

		

		
	}
}
