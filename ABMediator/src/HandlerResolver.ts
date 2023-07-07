import IHandler from "./IHandler";
import NiceValidation from "./Validator/NiceValidation";

type CommandClass<T> = new (...args: any[]) => T;

export default class HandlerResolver {

    private Handlers: any = {};
    private handlers: Map<CommandClass<any>, {
        handler: CommandClass<IHandler<any, any>>,
        validater: CommandClass<NiceValidation<any>> | null
    }> = new Map();

    Add<Req, Resp>(
        name: CommandClass<Req>,
        handler: CommandClass<IHandler<Req, Resp>>,
        validator?: CommandClass<NiceValidation<Req>>
    ) {

        this.handlers.set(name, {
            handler,
            validater: (validator) ? validator : null
        });

    }

    get<Rq, Rs>(name: CommandClass<Rq>): {
        handler: CommandClass<IHandler<Rq, Rs>>,
        validater: CommandClass<NiceValidation<Rq>> | null
    } {

        let ret = this.handlers.get(name);
        if (ret) {
            return ret;
        }

        throw new Error("Handler not found!");

    }

}