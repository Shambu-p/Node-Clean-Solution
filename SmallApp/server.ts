
import express from 'express';
import fs from 'fs';
import InfrastructureLibrary from "Infrastructure";
import ApplicationLibrary from "Application";
import IConfiguration from "Domain/Interfaces/IConfiguration";
import bodyParser from "body-parser";
import { HandlerResolver } from 'ABMediator';

const app = express();
const router = express.Router();

try {

    const infrastructure = InfrastructureLibrary();
    const configuration: IConfiguration = infrastructure.Configuration;
    const port = configuration.getConfiguration("ServerPort");
    const application: HandlerResolver = ApplicationLibrary(
        infrastructure.Database, infrastructure.Authentication, 
        infrastructure.Identity, infrastructure.Mailer, infrastructure.Logger
    );

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    /**
     * authentication will be checked here
     */
    app.use(async (req, res, next) => {

        //middleware can be written here
        next();

    });

    app.get("/", async (req, res, next) => {
        res.json({
            statusCode: 200,
            message: "Wellcome to Retask REST API developed with node js, express using Clean Architecture Design patter."
        });
    });

    fs.readdirSync("Controllers").forEach(function (file) {
        if (file.substr(-3) == ".ts") {
            const route = require("./Controllers/" + file);
            route.controller(app, application, infrastructure.Authentication);
        }
    });

    module.exports = app;

    app.listen(port, function () {
        console.log(`api running on port ${port}`);
    });

} catch (error: any) {
    console.log(error.message);
}