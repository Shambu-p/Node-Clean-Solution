
export default class Response {

    public Status: number
    public Message: string

    private constructor(status: number, message: string){
        this.Status = status;
        this.Message = message;
    }
    
    public static responed(message: string, statusCode = 500): Response {
        let res = new Response(statusCode, message);
        return res;
    }

    public static Succeded(message: string): Response {
        return this.responed(message, 200);
    }

    public static NotFound(message: string): Response {
        return this.responed(message, 400);
    }

}