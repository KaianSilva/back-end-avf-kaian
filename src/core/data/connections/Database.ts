import {Connection, createConnection} from 'typeorm';

export default class Database{
    private static connection: Connection;

    public getConnection(): Connection {
        if(Database.connection === null || Database.connection === undefined){
            throw new Error('CONEXAO_NAO_ABERTA');
        }
        return Database.connection;
    }

    public async openConnection():Promise<void> {
        if(Database.connection === null || Database.connection === undefined){
            try {
                Database.connection = await createConnection();
            } catch (error) {
                console.error('ERRO AO CONECTAR AO BANCO ->', error);
                throw new Error(`ERRO AO CONECTAR AO BANCO -> ${error}`)
            }
        }
    }
}