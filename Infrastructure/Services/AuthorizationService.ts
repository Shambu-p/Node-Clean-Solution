import AuthResult from "Domain/interfaces/AuthResult";
import Response from "Domain/Model/Response";
import Authentication from "../Authentication/Authentication";

export default (auth: Authentication, controller: ((req: any, res: any, next: any) => any)): ((req: any, res: any, next: any) => Promise<void>) => {
        
    return (async (req: any, res: any, next: any): Promise<void> => {

        let headerMap = new Map<string, any>(Object.entries(req.headers));

        //check if the header has the authentication key
        if (!headerMap.has(auth.TokenName)) {
            res.json(Response.responed(`Missing authentication token, Access Denied!`, 400));
        }

        try {

            //get the token based on the developer configuration setup
            let token: string = headerMap.get(auth.TokenName);

            let user = auth.Authorize<AuthResult>(token);
            req.authorizedUser = user;

            await controller(req, res, next);

        } catch (error: any) {
            res.json(Response.responed(`${error.message}, Access Denied!`, 400));
        }

    });

}