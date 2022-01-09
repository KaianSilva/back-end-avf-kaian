import { Router } from 'express';

import MessageController from '../controllers/MessageController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new MessageController();

        routes.get('/messages', controller.index);
        routes.get('/messages/:uid', controller.view);
        routes.get('/messagesUser/:user_uid', controller.show);
        routes.post('/messages', controller.store);
        routes.put('/messages/:uid', controller.update);
        routes.delete('/messages/:uid', controller.destroy);
        
        return routes;
    }

}