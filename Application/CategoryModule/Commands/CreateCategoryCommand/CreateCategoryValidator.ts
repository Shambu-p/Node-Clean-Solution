import {CreateCategoryCommand} from "./CreateCategoryLogic";
import {NiceValidation} from "ABMediator";

export default class CreateCategoryValidator extends NiceValidation<CreateCategoryCommand> {

    async Validate() {
        this.Rule("Name", prop =>
            prop.MaxLength(50)
                .MinLength(5)
                .required()
        );
    }

}