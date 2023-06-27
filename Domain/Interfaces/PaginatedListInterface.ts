
export default interface PaginatedListInterface<T> {

    Items: Array<T>
    PageNumber: number
    PageSize: number
    TotalCount: number

    // Create(list: Array<T>, pageNumber: number, pageSize: number): PaginatedListInterface<T>

}