import AuthenticationInterface from "Domain/Interfaces/AuthenticationInterface";
import Identity from "./Identity";
const jwt = require("jsonwebtoken");

export default class Authentication implements AuthenticationInterface {

    private static User: any | null = null;
    private readonly SecretKey: string
    public readonly TokenName: string
    private readonly Expiration: number
    private readonly Identity: Identity

    constructor(configuration: any, identity: Identity) {
        this.SecretKey = configuration.secret_key;
        this.TokenName = configuration.token_name;
        this.Expiration = configuration.expire_after;
        this.Identity = identity;
    }

    Authorize<T>(token: string): T {
        return jwt.verify(token, this.SecretKey);
    }

    async Authenticate<T>(loginLogic: (identity: Identity) => Promise<T>): Promise<{ token: string | null; state: boolean; user: T | null; }> {

        const userObject = await loginLogic(this.Identity);
        let user: any = new Object(userObject);

        if (!user[this.Identity.IdentifierName] && user[this.Identity.IdentifierName] == null) {
            throw new Error(`Identifier named ${this.Identity.IdentifierName} was not found or it is null in the object to be authenticated`);
        }

        const token = jwt.sign({ ...user, _id: user[this.Identity.IdentifierName] }, this.SecretKey, {
            expiresIn: `${this.Expiration}hr`,
        });

        return {
            token: token,
            state: true,
            user: userObject
        }

    }

    GetUser<T>(): T {
        return Authentication.User;
    }

    fromToken<T>(token: string): T {
        return jwt.verify(token, this.SecretKey);
    }

    setUser<T>(value: (T | null)) {
        Authentication.User = value;
    }

    async Authorization<T>(authLogic?: (loggedUser: T) => Promise<boolean>): Promise<void> {
        if (authLogic) {
            if (!await authLogic(Authentication.User)) {
                throw new Error("Authorization failed!");
            }
        }
    }

    getToken() {
        return jwt.sign(
            {
                data: 'foobar'
            },
            'secret',
            { expiresIn: '1h' }
        );
    }

    verify<T>(token: string): T {
        let decoded = jwt.verify(token, this.SecretKey);
        return decoded;
    }

}