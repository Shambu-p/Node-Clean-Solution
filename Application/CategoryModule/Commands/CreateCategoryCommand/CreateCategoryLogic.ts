import Response from "Domain/Model/Response";
import HandlerInterface from "Domain/Interfaces/HandlerInterface";
import IContext from "Domain/Interfaces/IContext";

export interface CreateCategoryCommand {
    Name: string
}

export class CreateCategoryLogic implements HandlerInterface<CreateCategoryCommand, Response> {

    Database: IContext

    constructor(db: IContext){
        this.Database = db;
    }

    async Handle(request: CreateCategoryCommand): Promise<Response> {
        
        let category = this.Database.Categories.create({
            Id: null, 
            Name: request.Name
        });

        this.Database.Categories.save(category);

        // let categories = await this.Database.Categories.find();
        return Response.Succeded("operation successful");

    }

}