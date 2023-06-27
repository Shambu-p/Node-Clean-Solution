import Records from "./Record";
const mysql = require('mysql2/promise');
// import Connection from "mysql2/typings/mysql/lib/Connection";

export default class Database {

    public static Connection: any = null;
    private static isOnTransaction = false;
    private readonly Configuration: any = null;

    constructor(configuration: any){
        this.Configuration = configuration;
    }

    async Query<T>(query: string, param?: (any)): Promise<Records<T>> {

        await this.Connect();
        Database.Connection.config.namedPlaceholders = true;
        const [results, fields] = await Database.Connection.execute(query, param ?? {});
        return new Records<T>(results);

    }

    private async Connect(){
        
        if(!Database.Connection){
            Database.Connection = await mysql.createConnection(this.Configuration);
        }

    }

    async beginTransaction(): Promise<void> {
        
        if(!Database.isOnTransaction) {
            await this.Query(`START TRANSACTION; SAVEPOINT default_savepoint;`);
            Database.isOnTransaction = true;
        }

    }
    
    async reverse(): Promise<void> {
        
        if(Database.isOnTransaction){
            await this.Query(`ROLLBACK TO default_savepoint; ROLLBACK;`);
            Database.isOnTransaction = false;
        }

    }

    async commit(): Promise<void> {

        if(Database.isOnTransaction){
            await this.Query(`COMMIT;`);
            Database.isOnTransaction = false;
        }

    }

    async savePoint(name: string): Promise<void> {

        if(Database.isOnTransaction){
            await this.Query(`SAVEPOINT :save_point_name;`, {save_point_name: name});
        }else{
            await this.Query(`START TRANSACTION; SAVEPOINT default_savepoint; SAVEPOINT :save_point_name;`, {save_point_name: name});
        }

    }

    async releaseSavePoint(name: string): Promise<void> {
        if(Database.isOnTransaction){
            await this.Query(`RELEASE SAVEPOINT :save_point_name;`, {save_point_name: name});
        }
    }

    async rollback(name: string) {
        if (Database.isOnTransaction) {
            await this.Query(`ROLLBACK TO :save_point_name;`, {save_point_name: name});
        }
    }

}