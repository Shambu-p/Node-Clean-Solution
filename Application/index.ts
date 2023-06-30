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

};