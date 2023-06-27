import IIdentity from "./IIdentity";

export default interface AuthenticationInterface {

    Authorize<T>(token: string): T;
    Authenticate<T>(logic: (identity: IIdentity) => Promise<T>): Promise<{
        token: string|null
        state: boolean,
        user: T | null
    }>;
    Authorization<T>(authLogic?: (loggedUser: T) => Promise<boolean>): Promise<void>;
    GetUser<T>(): T

}