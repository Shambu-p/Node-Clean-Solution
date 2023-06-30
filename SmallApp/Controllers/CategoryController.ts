import { ABMediator, HandlerResolver } from "ABMediator";
import {CreateCategoryCommand} from "Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import { GetCategories } from "Application/CategoryModule/Queries/GetAllCategories/GetCategories";
import Category from "Domain/Entities/Category";
import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";
import Response from "Domain/Model/Response";

module.exports.controller = function (app: any, application: HandlerResolver) {

    const mediator = new ABMediator(application);

    app.get("/api/Category/:pageNumber/:pageSize", async (req: any, res: any, next: any) => {
        try{
            res.json(await mediator.send<GetCategories, PaginatedListInterface<Category>>("get_category", {
                PageSize: req.params.pageSize,
                PageNumber: req.params.pageNumber
            }));
        } catch(error: any){
            res.json(Response.responed(error.message));
        }
    });
    
    app.post("/api/Category", async ({body}: {body: CreateCategoryCommand}, res: any, next: any) => {
        try{
            res.json(await mediator.send<CreateCategoryCommand, Response>("add_category", body));
            // res.json(await application.categoryModule.createCategoryRequest(body));
        } catch(error: any){
            res.json(Response.responed(error.message));
        }
    });

}