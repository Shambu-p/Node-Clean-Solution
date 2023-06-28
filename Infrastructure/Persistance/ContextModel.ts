import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import Database from "./Database";

export default class ContextModel {

    readonly Database: DataSource

    constructor(db: Database) {
        this.Database = db.Source;
    }

    public getTable<T extends ObjectLiteral>(model: EntityTarget<T>): Repository<T> {
        return this.Database.getRepository(model);
    }

}