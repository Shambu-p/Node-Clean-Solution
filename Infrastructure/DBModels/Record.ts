import PaginatedList from "./PaginatedList";
import RecordsInterface from "Domain/Interfaces/RecordsInterface";

export default class Records<T> implements RecordsInterface<T> {

    private readonly Data: Array<T>
    public Count: number = 0;

    constructor(data: Array<T>) {
        this.Data = data;
        this.Count = data.length;
    }

    First(): (T|null) {
        return (this.Data.length > 0) ? this.Data[0] : null;
    }

    All(): Array<T> {
        return this.Data;
    }

    Where(callback: (single: T) => boolean): Records<T> {
        return new Records<T>(this.Data.filter(callback));
    }

    Find(callback: (single: T) => boolean): (T|null) {
        return this.Data.find(callback) ?? null;
    }

    Select<R>(callback: (single: T) => R): Records<R> {
        return new Records<R>(this.Data.map<R>(callback));
    }

    Last(): (T|null) {
        return (this.Data.length > 0) ? this.Data[this.Data.length - 1] : null;
    }

    PaginatedList(pageNumber: number, pageSize: number): PaginatedList<T> {
        return PaginatedList.Create<T>(this.Data, pageNumber, pageSize)
    }

}