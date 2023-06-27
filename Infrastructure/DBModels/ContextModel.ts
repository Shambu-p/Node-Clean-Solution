import DBTable from "./DBTable";
import Database from "./Database";

export default class ContextModel {

    private readonly Database: Database

    constructor(db: Database){
        this.Database = db;
    }

    public getTable<T>(name: string, pk = "id"): DBTable<T> {
        return new DBTable<T>(this.Database, name, pk);
    }

    async beginTransaction(name: string): Promise<void> {
        await this.Database.savePoint(name);
    }

    async rollbackTransaction(name: string): Promise<void> {
        await this.Database.rollback(name);
    }
    
    async commitTransaction(name: string): Promise<void> {
        await this.Database.releaseSavePoint(name);
    }

    async savePoint(name: string): Promise<void> {
        await this.Database.savePoint(name);
    }

    async reverse(): Promise<void> {
        await this.Database.reverse();
    }

}