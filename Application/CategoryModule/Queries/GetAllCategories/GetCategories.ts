import Category from "Domain/Entities/Category";
import IContext from "Domain/Interfaces/IContext";
import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";
import PaginatedList from "../../../Common/Models/PaginatedList";
import { IHandler } from "ABMediator";
import ILogger from "Domain/Interfaces/ILogger";
import LogLevel from "Domain/Enums/LogLevel";

export interface GetCategories {
    PageNumber: number,
    PageSize: number
};

export class GetCategoriesHandler implements IHandler<GetCategories, PaginatedListInterface<Category>> {

    Database: IContext;
    Logger: ILogger;
    
    constructor(db: IContext, logger: ILogger){
        this.Database = db;
        this.Logger = logger;
    }

    async Handle(request: GetCategories): Promise<PaginatedListInterface<Category>> {

        let totalCount = await this.Database.Categories.count();
        let limit = PaginatedList.Create(totalCount, request.PageNumber, request.PageSize);
        let categories = await this.Database.Categories.find({
            take: request.PageSize,
            skip: limit.start
        });

        this.Logger.log({
            message: "categories fetched",
            level: LogLevel.SUCCESS
        });

        return new PaginatedList(categories, totalCount, request.PageNumber, request.PageSize);

    }

}