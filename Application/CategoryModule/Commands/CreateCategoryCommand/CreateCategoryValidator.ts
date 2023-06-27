import {CreateCategoryCommand} from "./CreateCategoryLogic";
import NiceValidation from "../../../Common/Models/NiceValidation";

export default class CreateCategoryValidator extends NiceValidation<CreateCategoryCommand> {

    constructor(command: CreateCategoryCommand) {
        super(command);
    }

    Validate() {
        this.Rule("Name", prop =>
            prop.MaxLength(50)
                .MinLength(5)
                .required()
        );
    }
}