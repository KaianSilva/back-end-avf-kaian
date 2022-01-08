import { Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";
import { Message } from "../../../core/data/database/entities/Message";

export default class MessageController {
	public async store(req: Request, res: Response) {
		const { title, description, user_uid } = req.body;

		const user = await User.findOne(user_uid);
		console.log(user_uid);
		console.log(user);

		if (user && user_uid != undefined) {
			const message = await new Message(title, description, user).save();
			console.log(message);
			return res.status(200).send("mensagem criada");
		} else {
			return res.status(404).send("Usuário não encontrado");
		}
	}

	public async index(req: Request, res: Response) {
		const messages = await Message.find();
		return res.json(messages);
	}

	public async view(req: Request, res: Response) {
		const { uid } = req.params;
		const messages = await Message.findOne(uid);

		console.log(messages);

		return res.json(messages);
	}

	public async update(req: Request, res: Response) {
		const { uid } = req.params;

		const { title, description, user_uid } = req.body;

		const message = await Message.findOne(uid);
		console.log(uid)
		const user = await User.findOne(user_uid);
		console.log(user_uid)

		if (title && description && user && message) {
			const result = await new Message(title, description, user, uid).save();
			console.log(result);
			return res.status(200).send("mensagem atualizado");
		} else {
			return res.status(400).send("Parâmetros faltando");
		}
	}

	public async destroy(req: Request, res: Response) {
		const { uid } = req.params;

		const message = await Message.findOne(uid);

		if (message) {
			const result = await Message.remove(message);
			console.log(result);
			return res.status(200).send("Mensagem excluído com sucesso");
		} else {
			return res.status(404).send("Mensagem não encontrada");
		}
	}
}
