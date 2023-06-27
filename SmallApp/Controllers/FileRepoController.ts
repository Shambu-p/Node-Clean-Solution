
import formidable from 'formidable';
import Response from 'Domain/Model/Response';

const fs = require('fs');

module.exports.controller = function (app: any, application: any) {

    app.post("/api/upload/:category", (req: any, res: any, next: any) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            try{
                res.json(application.fileModule.fileUploadRequest(req.params.category, files.filetoupload));
            }catch(error: any) {
                res.json(Response.responed(error.message));
            }
        });
    });

    app.get("/api/file/:name", (req: any, res: any, next: any) => {
        try{
            res.sendFile(req.params.name, {root: application.fileModule.getFileRequest()});
        }catch(error: any) {
            res.json(Response.responed(error.message));
        }
    });

}