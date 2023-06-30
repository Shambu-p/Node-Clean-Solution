import AuthenticationInterface from "Domain/Interfaces/AuthenticationInterface";
import {
    CreateCategoryCommand,
    CreateCategoryLogic
} from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Response from "Domain/Model/Response";
import CreateCategoryValidator from "./CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator";
import IContext from "Domain/Interfaces/IContext";
import Category from "Domain/Entities/Category";
import { GetCategories, GetCategoriesHandler } from "./CategoryModule/Queries/GetAllCategories/GetCategories";
import PaginatedListInterface from "Domain/Interfaces/PaginatedListInterface";
import IIdentity from "Domain/Interfaces/IIdentity";
import IMailer from "Domain/Interfaces/IMailer";

import {ABMediator, HandlerResolver} from "ABMediator";

export default function (
    db: IContext, auth: AuthenticationInterface,
    identity: IIdentity, mailer: IMailer): HandlerResolver {

    const handlers = ABMediator.getResolver();

    handlers.Add<CreateCategoryCommand, Response>(
        "add_category", new CreateCategoryLogic(db),
        new CreateCategoryValidator()
    );
    
    handlers.Add<GetCategories, PaginatedListInterface<Category>>(
        "get_category", new GetCategoriesHandler(db)
    );

    return handlers;
    // return {

    //     categoryModule: {
    //         /**
    //          * this method could throw validation errors
    //          * Creates Category using command passed to it
    //          * @param command
    //          */
    //         createCategoryRequest: async function (command: CreateCategoryCommand): Promise<Response> {
    //             new CreateCategoryValidator(command).Validate();
    //             return await new CreateCategoryLogic(db).Handle(command);
    //         },

    //         /**
    //          * this cmethod will return all saved categories
    //          * on database
    //          * @param command 
    //          * @returns 
    //          */
    //         getAllCategories: async function (command: GetCategories): Promise<PaginatedListInterface<Category>> {
    //             return await new GetCategoriesHandler(db).Handle(command);
    //         }

    //     },

    // }

};