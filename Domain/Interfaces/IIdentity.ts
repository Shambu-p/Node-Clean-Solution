import IDBTable from "./IDBTable";

export default interface IIdentity {

    Create<T>(user: T): Promise<boolean>;
    Update<T>(user: T): Promise<boolean>;
    Remove<T>(id: number | string): Promise<boolean>;
    getCollection<T>(): IDBTable<T>

}