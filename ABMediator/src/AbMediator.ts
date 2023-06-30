import HandlerResolver from "./HandlerResolver";

export default class ABMediator {

    private Handler: HandlerResolver;

    constructor(resolver: HandlerResolver) {
        this.Handler = resolver;
    }

    public static getResolver(): HandlerResolver {
        return new HandlerResolver();
    }

    async send<Rq, Rs>(name: string, command: Rq): Promise<Rs> {

        let resolver = this.Handler.get<Rq, Rs>(name);
        
        // check validator is set.
        if(resolver.validater != null){
            await resolver.validater.setUp(command);
        }
        
        return await resolver.handler.Handle(command);

    }

}