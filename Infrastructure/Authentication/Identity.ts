import {DeleteResult, ObjectLiteral, Repository, UpdateResult} from "typeorm";
import Database from "../Persistance/Database";
import bcrypt from 'bcrypt';
import IIdentity from "Domain/Interfaces/IIdentity";

const jwt = require("jsonwebtoken");


export default class Identity implements IIdentity {

    private readonly HashedProperties: Array<string>
    public readonly IdentifierName: string;
    private readonly TableName: string
    private readonly DbConnection: Database
    private readonly SaltRounds = 8;

    constructor(configuration: any, connection: Database) {

        if(!configuration.id || configuration.id == null) {
            throw new Error("identifier 'id' is not set in configuration file under 'Identity' segment");
        } else if(!configuration.hashed_properties || configuration.hashed_properties == null) {
            throw new Error("identifier 'hashed_properties' is not set in configuration file under 'Identity' segment");
        } else if(!configuration.table || configuration.table == null) {
            throw new Error("identifier 'table' is not set in configuration file under 'Identity' segment");
        }

        this.HashedProperties = configuration.hashed_properties;
        this.IdentifierName = configuration.id;
        this.TableName = configuration.table
        this.DbConnection = connection;

    }

    getCollection<R extends ObjectLiteral>(): Repository<R> {
        throw new Error("method not implemented yet!");
        // return new DBTable<R>(this.DbConnection, this.TableName, this.IdentifierName);
    }

    private dataCleaner(obj: any): any {

        let entries = Object.entries(obj);

        //search for all the properties declared as encrypted values
        //and change their value to encrypted value
        entries.forEach(([prop, value]: [string, any]) => {
            if(this.HashedProperties.indexOf(prop) >= 0){
                //encrypt the value and set it back
                obj[prop] = bcrypt.hashSync(value, this.SaltRounds);
            }
        });

        return obj;

    }

    async Update<T extends ObjectLiteral>(id: number, user: T): Promise<UpdateResult> {

        let dbTable = this.getCollection<T>();
        return await dbTable.update(id, user);

    }

    async Create<T extends ObjectLiteral>(user: T): Promise<T> {

        let dbTable = this.getCollection<T>();
        let data = dbTable.create(user);
        return await dbTable.save(data);

    }

    async Remove<T extends ObjectLiteral>(id: string | number): Promise<DeleteResult> {

        let dbTable = this.getCollection<T>();
        return await dbTable.delete(id);

    }

    verifyHashed(hashValue: string, value: string): boolean {
        return bcrypt.compareSync(value, hashValue);
    }

}