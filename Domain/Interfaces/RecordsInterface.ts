import PaginatedListInterface from "./PaginatedListInterface";

export default interface RecordsInterface<T> {

    Count: number;

    First(): (T|null)
    All(): Array<T>
    Find(callback: (single: T) => boolean): (T|null);
    Where(callback: (single: T) => boolean): RecordsInterface<T>
    Select<R>(callback: (single: T) => R): RecordsInterface<R>
    Last(): (T|null)
    PaginatedList(pageNumber: number, pageSize: number): PaginatedListInterface<T>

}