import { Router } from 'express';

import UserController from '../controllers/UserController';

export default class Routes{

    public init(): Router {
        const routes = Router();

        const controller = new UserController();

        routes.get('/user', controller.index);
        routes.get('/user/:uid', controller.view);
        routes.post('/user', controller.store);
        routes.put('/user/:uid', controller.update);
        routes.delete('/user/:uid', controller.destroy);
        
        return routes;
    }

}