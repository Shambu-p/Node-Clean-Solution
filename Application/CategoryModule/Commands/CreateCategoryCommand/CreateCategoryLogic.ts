import Response from "Domain/Model/Response";
import IContext from "Domain/Interfaces/IContext";
import { IHandler } from "ABMediator";
import ILogger from "Domain/Interfaces/ILogger";
import LogLevel from "Domain/Enums/LogLevel";
export interface CreateCategoryCommand {
    Name: string
}

export class CreateCategoryLogic implements IHandler<CreateCategoryCommand, Response> {

    Database: IContext;
    Logger: ILogger;

    constructor(db: IContext, logger: ILogger){
        this.Database = db;
        this.Logger = logger;
    }

    async Handle(request: CreateCategoryCommand): Promise<Response> {
        
        let category = this.Database.Categories.create({
            Id: null, 
            Name: request.Name
        });

        this.Database.Categories.save(category);
        this.Logger.log({
            message: `new category named ${request.Name} added `,
            level: LogLevel.SUCCESS
        })
        // let categories = await this.Database.Categories.find();
        return Response.Succeded("operation successful");

    }

}