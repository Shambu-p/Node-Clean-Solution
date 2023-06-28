import HandlerResolver from "./HandlerResolver";
import IHandler from "./IHandler";
// import ValidationResolver from "./ValidationResolver";

export default class ABMediator {

    private Handler: HandlerResolver;
    //  = new HandlerResolver();
    // private static Validation: ValidationResolver = new ValidationResolver();

    constructor(resolver: HandlerResolver) {
        this.Handler = resolver;
    }

    public static getResolver(): HandlerResolver {
        return new HandlerResolver();
    }

    // addHandler<Rq, Rs>(name: string, handler: IHandler<Rq, Rs>) {
    //     this.Handler.Add<Rq, Rs>(name, handler);
    // }

    async send<Rq, Rs>(name: string, command: Rq): Promise<Rs> {
        let handler = this.Handler.get<Rq, Rs>(name);
        return await handler.Handle(command);
    }

}