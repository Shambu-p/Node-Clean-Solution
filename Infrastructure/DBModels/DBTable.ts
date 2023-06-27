import Record from "./Record";
import Database from "./Database";
import IDBTable from "Domain/Interfaces/IDBTable";

export default class DBTable<T> implements IDBTable<T> {

    private readonly TableName: string
    private readonly PrimaryKey: string
    private readonly DB: Database
    private change: boolean = true;
    private records: Record<T> = new Record<T>([]);

    constructor(db: Database, name: string, pk = "id") {
        this.TableName = name;
        this.PrimaryKey = pk;
        this.DB = db;
    }

    async Records(): Promise<Record<T>>{
        
        if(this.change){
            this.records = await this.DB.Query<T>(`select * from ${this.TableName}`);
            this.change = false;
        }

        return this.records;

    }

    async Add(record: (T|Array<T>)): Promise<boolean> {

        if(Array.isArray(record)){
            return await this.AddRange(record);
        }

        let obj = new Object(record);

        let res = this.getAddSingleQuery(obj);
        
        let query = `insert into ${this.TableName} (${Object.keys(obj).join(", ")}) values ${res.valuesQuery}`;
        await this.DB.Query(query, res.values);
        
        this.change = true;
        return true;

    }

    private getAddSingleQuery(obj: any, index = 0): {
        values: any,
        valuesQuery: string
    } {
        
        let placehoders: Array<string> = [];
        let parameters: any = {};
        
        Object.entries(obj).forEach(([key, value]) => {
            placehoders.push(`:column${index}_${key}`);
            parameters[`column${index}_${key}`] = value;
        });

        return {
            values: parameters,
            valuesQuery: `(${placehoders.join(", ")})`
        };

    }

    private async AddRange(records: Array<T>): Promise<boolean> {

        let valuesQuery: Array<string> = [];
        let values = new Map<string, any>();
        let columns: Array<string> = [];

        records.forEach((rec, index) => {
            
            let obj = new Object(rec);
            if(columns.length == 0){
                columns = Object.keys(obj);
            }

            let res = this.getAddSingleQuery(obj, index);
            valuesQuery.push(res.valuesQuery);
            values = {...values, ...res.values}
            
        });
        
        
        let query = `insert into ${this.TableName} (${columns.join(", ")}) values ${valuesQuery.join(", ")};`;

        await this.DB.Query(query, Array.from(values));
        this.change = true;
        return true;
        
    }

    async Update(record: (T|Array<T>)): Promise<boolean> {

        if(Array.isArray(record)){
            return await this.UpdateRange(record);
        }

        let result = this.getSingleRecordUpdate(new Object(record));
        await this.DB.Query(result.query, result.parameters);
        this.change = true;
        return true;

    }

    private getSingleRecordUpdate(obj: any, index = 0): {
        query: string,
        parameters: any
    } {

        let values: any = {};
        let sets: Array<string> = [];
        let pkValue = null;

        Object.entries(obj).forEach(([key, value]) => {
            
            if(key == this.PrimaryKey){
                pkValue = value;
                return;
            }

            sets.push(`${key} = :column${index}_${key}`);
            values[`column${index}_${key}`] = value;

        });

        if(pkValue == null){
            throw new Error(`for the primary key named ${this.PrimaryKey} value is not set in the table named ${this.TableName}`);
        }

        return {
            query: `update ${this.TableName} set ${sets.join(", ")} where ${this.PrimaryKey} = ${pkValue}`,
            parameters: values
        };

    }

    private async UpdateRange(records: Array<T>): Promise<boolean> {

        let queries: Array<string> = [];
        let values: any = {};

        records.forEach((record, index) => {

            let res = this.getSingleRecordUpdate(new Object(record), index);

            queries.push(res.query);
            values = {...values, ...res.parameters};

        });

        await this.DB.Query(queries.join("; "), values);
        this.change = true;
        return true;

    }

    async Delete(pk: ((number|string)|Array<(number|string)>)): Promise<boolean> {
        
        if(Array.isArray(pk)){
            return await this.DeleteRange(pk);
        }

        let query = `delete from ${this.TableName} where ${this.PrimaryKey} = :pk`;
        await this.DB.Query(query, {"pk": pk});
        this.change = true;
        return true;

    }

    async DeleteRange(pk: Array<number|string>): Promise<boolean> {
        
        let queries: Array<string> = [];
        let values: any = {};
        
        pk.forEach((p, i) => {
            queries.push(`${this.PrimaryKey} = :pk${i}`);
            values[`pk${i}`] = p;
        });

        await this.DB.Query(`delete from ${this.TableName} where ${queries.join(" or ")}`, values);
        this.change = true;
        return true;

    }

}