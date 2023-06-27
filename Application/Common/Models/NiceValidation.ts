import ValidationException from "../Exceptions/ValidationException";
import ABValidator from "./ABValidator";

export default class NiceValidation<T> {

    Command: T
    Props: Map<string, any>

    constructor(command: T) {
        this.Command = command;
        this.Props = new Map<string, any>(Object.entries(new Object(command)));
    }

    public async RuleAsync(propertyName: string, callback: (validator: ABValidator) => (Promise<ABValidator> | ABValidator)): Promise<void> {

        if(!this.Props.has(propertyName)) {
            throw new ValidationException(`property named ${propertyName} is not defined!`);
        }

        let res = await callback(new ABValidator(propertyName, this.Props.get(propertyName)));
        if(!res.Result) {
            throw new ValidationException(res.getMessage());
        }

    }

    public Rule(propertyName: string, callback: (validator: ABValidator) => ABValidator): void {

        if(!this.Props.has(propertyName)) {
            throw new ValidationException(`property named ${propertyName} is not defined!`);
        }

        let res = callback(new ABValidator(propertyName, this.Props.get(propertyName)));
        if(!res.Result) {
            throw new ValidationException(res.getMessage());
        }

    }

    Validate(){}

}