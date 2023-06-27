import Category from "Domain/Entities/Category";
import HandlerInterface from "Domain/Interfaces/HandlerInterface";
import IContext from "Domain/Interfaces/IContext";
import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";

export interface GetCategories {
    PageNumber: number,
    PageSize: number
};

export class GetCategoriesHandler implements HandlerInterface<GetCategories, PaginatedListInterface<Category>> {

    Database: IContext

    constructor(db: IContext){
        this.Database = db;
    }

    async Handle(request: GetCategories): Promise<PaginatedListInterface<Category>> {
        let categories = await this.Database.Categories.Records();
        return categories.PaginatedList(request.PageNumber, request.PageSize);
    }

}