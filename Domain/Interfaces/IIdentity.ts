import { DeleteResult, ObjectLiteral, Repository, UpdateResult } from "typeorm";

export default interface IIdentity {

    Create<T extends ObjectLiteral>(user: T): Promise<T>;
    Update<T extends ObjectLiteral>(id: number, user: T): Promise<UpdateResult>;
    Remove<T extends ObjectLiteral>(id: number | string): Promise<DeleteResult>;
    getCollection<T extends ObjectLiteral>(): Repository<T>

}