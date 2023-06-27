
export default interface HandlerInterface<Request, Response> {

    /**
     * this method will contain all the specified request handling logic
     * @param request
     * @constructor
     *  the constructor will manage dependencies
     * @returns Response
     *  will return the specified type of object
     */
    Handle(request: Request): Promise<Response>
}