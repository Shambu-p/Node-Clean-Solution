import IHandler from "./IHandler";

export default class HandlerResolver {

    private Handlers: any = {};

    Add<Req, Resp>(name: string, handler: IHandler<Req, Resp>) {
        this.Handlers[name] = handler;
    }

    get<Rq, Rs>(name: string): IHandler<Rq, Rs> {
        
        if(this.Handlers[name]) {
            return this.Handlers[name];
        }

        throw new Error("Handler not found!");

    }

}