import Category from "../Entities/Category";
import IDBTable from "./IDBTable";

export default interface IContext {
    
    Categories: IDBTable<Category>

    beginTransaction(name: string): Promise<void>;
    rollbackTransaction(name: string): Promise<void>;
    commitTransaction(name: string): Promise<void>;

}