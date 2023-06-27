import RecordsInterface from "./RecordsInterface";

export default interface IDBTable<T> {

    Records(): Promise<RecordsInterface<T>>;
    Add(record: (T|Array<T>)): Promise<boolean>;
    Update(record: (T|Array<T>)): Promise<boolean>;
    Delete(pk: ((number|string)|Array<(number|string)>)): Promise<boolean>;

}