import IHandler from "./IHandler";
import NiceValidation from "./Validator/NiceValidation";

export default class HandlerResolver {

    private Handlers: any = {};

    Add<Req, Resp>(name: string, handler: IHandler<Req, Resp>, validator?: NiceValidation<Req>) {
        
        this.Handlers[name] = {
            handler,
            validater: (validator) ? validator : null
        };

    }

    get<Rq, Rs>(name: string): {
        handler: IHandler<Rq, Rs>,
        validater: NiceValidation<Rq>
    } {

        if(this.Handlers[name]){
            return this.Handlers[name];
        }
        
        throw new Error("Handler not found!");

    }

}