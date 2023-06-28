import Category from "Domain/Entities/Category";
import HandlerInterface from "Domain/Interfaces/HandlerInterface";
import IContext from "Domain/Interfaces/IContext";
import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";
import PaginatedList from "../../../Common/Models/PaginatedList";

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

        let totalCount = await this.Database.Categories.count();
        let limit = PaginatedList.Create(totalCount, request.PageNumber, request.PageSize);
        let categories = await this.Database.Categories.find({
            take: request.PageSize,
            skip: limit.start
        });

        return new PaginatedList(categories, totalCount, request.PageNumber, request.PageSize);

    }

}