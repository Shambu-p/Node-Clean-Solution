import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";

export default class PaginatedList<T> implements PaginatedListInterface<T> {

    Items: Array<T>
    PageNumber: number
    PageSize: number
    TotalCount: number

    private constructor(list: Array<T>, pageNumber: number, pageSize: number) {

        this.TotalCount = list.length;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;

        let startIndex = (pageNumber - 1) * pageSize;
        let endIndex = startIndex + pageSize;

        if((startIndex < list.length || startIndex == 0) && startIndex >= 0 && endIndex > 0){
            this.Items = list.slice(startIndex, (((endIndex + 1) <= list.length) ? endIndex + 1 : list.length));
        } else {
            throw new Error("Incorrect pagination!");
        }

        return this;

    }

    static Create<R>(list: R[], pageNumber: number, pageSize: number): PaginatedListInterface<R> {
        return new PaginatedList<R>(list, pageNumber, pageSize);
    }

}