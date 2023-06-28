import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";

export default class PaginatedList<T> implements PaginatedListInterface<T> {

    Items: Array<T>
    PageNumber: number
    PageSize: number
    TotalCount: number

    constructor(list: Array<T>, totalCount: number, pageNumber: number, pageSize: number) {

        this.TotalCount = totalCount;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;
        this.Items = list;

    }

    static Create(totalCount: number, pageNumber: number, pageSize: number): {start: number, end: number} {

        let startIndex = (pageNumber - 1) * pageSize;
        let endIndex = startIndex + pageSize;

        if((startIndex < totalCount || startIndex == 0) && startIndex >= 0 && endIndex > 0) {
            return {
                start: startIndex,
                end: (((endIndex + 1) <= totalCount) ? endIndex + 1 : totalCount)
            };
        } else {
            throw new Error("Incorrect pagination!");
        }

    }

}