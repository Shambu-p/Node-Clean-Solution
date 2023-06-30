import ValidationException from "./ValidationException";
import ABValidator from "./ABValidator";

export default abstract class NiceValidation<T> {

    declare Command: T
    declare Props: Map<string, any>


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

    async setUp(command: any){
        
        this.Command = command;
        this.Props = new Map<string, any>(Object.entries(new Object(command)));

        await this.Validate();

    }

    abstract Validate(): void;

}