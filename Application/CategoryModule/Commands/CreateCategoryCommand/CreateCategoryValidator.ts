import ILogger from "Domain/Interfaces/ILogger";
import {CreateCategoryCommand} from "./CreateCategoryLogic";
import { NiceValidation } from "ABMediator";
import IContext from "Domain/Interfaces/IContext";
import LogLevel from "Domain/Enums/LogLevel";

export default class CreateCategoryValidator extends NiceValidation<CreateCategoryCommand> {

    Logger: ILogger;
    Database: IContext;

    constructor(db: IContext, logger: ILogger) {
        super();
        this.Logger = logger;
        this.Database = db;
    }

    async Validate() {
        await this.RuleAsync("Name", prop =>
            prop.MaxLength(50)
                .MinLength(5)
                .required()
                .MustAsync(async property => await this.checkCategory(property, this.Database), "category should be unique!")
        );
    }

    async checkCategory(value: string, context: IContext): Promise<boolean> {

        let count = await context.Categories.countBy({ Name: value });
        if(count > 0) {
            this.Logger.log({
                message: `tried to add ${value} which is already registed`,
                level: LogLevel.ERROR
            });
        }

        return count == 0;

    }

}