import HandlerResolver from "./HandlerResolver";
import Injector from "./Injector";

type CommandClass<T> = new (...args: any[]) => T;

export default class ABMediator {

    private Handler: HandlerResolver;
    private Injecter: Injector;

    constructor(resolver: HandlerResolver, injector: Injector) {
        this.Handler = resolver;
        this.Injecter = injector;
    }

    public static getResolver(): HandlerResolver {
        return new HandlerResolver();
    }

    async send<Rq, Rs>(name: CommandClass<Rq>, command: Rq): Promise<Rs> {

        let resolver = this.Handler.get<Rq, Rs>(name);
        let validator, handler;
        // check validator is set.
        if(resolver.validater) {
            validator = this.Injecter.resolve(resolver.validater);
            await validator.setUp(command);
        }
        
        handler = this.Injecter.resolve(resolver.handler);
        return await handler.Handle(command);

    }

}