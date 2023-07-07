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
import ILogger from "Domain/Interfaces/ILogger";

import {ABMediator, Builder, HandlerResolver} from "ABMediator";

/* db: IContext, auth: AuthenticationInterface,
    identity: IIdentity, mailer: IMailer, logger: ILogger */
export default function (handlers: HandlerResolver, builder: Builder): HandlerResolver {

    handlers.Add(CreateCategoryCommand, CreateCategoryLogic, CreateCategoryValidator);
    handlers.Add(GetCategories, GetCategoriesHandler);

    return handlers;

};