import "reflect-metadata";

type InjectableClass<T> = new (...args: any[]) => T;


export default class Injector {
    
    private dependencies: Map<InjectableClass<any>, any> = new Map();

    register<T>(injectableClass: InjectableClass<T>, instance: T) {
        this.dependencies.set(injectableClass, instance);
    }

    resolve<T>(injectableClass: InjectableClass<T>): T {
        if (this.dependencies.has(injectableClass)) {
            const instance = this.dependencies.get(injectableClass);
            if (!instance) {
                throw new Error("dependancy cannot be initiated!");
            }

            return instance;
        }

        const paramTypes = Reflect.getMetadata('design:paramtypes', injectableClass) as InjectableClass<any>[];
        // console.log(paramTypes);
        const dependencies = paramTypes.map((paramType) => this.resolve(paramType));
        const instance = new injectableClass(...dependencies);

        this.dependencies.set(injectableClass, instance);
        return instance;
    }
}

