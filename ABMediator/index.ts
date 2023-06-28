
import HandlerResolver from "./src/HandlerResolver";
// import ABMediator from "./src/AbMediator";
// import IHandler from "./src/IHandler";

// import ABMediator from "./src/AbMediator";
// import IHandler from "./src/IHandler";

// class MyHandler implements IHandler<string, string> {
    
//     async Handle(request: string): Promise<string> {
//         return `request has been processed: ${request}`;
//         // throw new Error("Method not implemented.");
//     }

// }


// Resolver definition
// const Resolver = ABMediator.getResolver();
// Resolver.Add<string, string>("my_handler", new MyHandler());

// Mediator definition
// const Mediator = new ABMediator(Resolver);
// console.log();

// Mediator.send<string, string>("myhandler", "mediator working").then(dt => {
//     console.log(dt);
// }).catch(er => {
//     console.log(`error happened ${er.message}`);
// });

// console.log(obj.Handle("come back"));

export default class ABMediator {

    private Handler: HandlerResolver;

    constructor(resolver: HandlerResolver) {
        this.Handler = resolver;
    }

    public static getResolver(): HandlerResolver {
        return new HandlerResolver();
    }

    async send<Rq, Rs>(name: string, command: Rq): Promise<Rs> {
        let handler = this.Handler.get<Rq, Rs>(name);
        return await handler.Handle(command);
    }

};