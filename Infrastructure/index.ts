import ConfigurationService from "./Services/ConfigurationService";
import Database from "./Persistance/Database";
import Authentication from "./Authentication/Authentication";
import DBContext from "./Persistance/DBContext";
import Identity from "./Authentication/Identity";
import Mailer from "./SendMail/Mailer";
import IConfiguration from "Domain/Interfaces/IConfiguration";
import ILogger from "Domain/Interfaces/ILogger";
import LoggerService from "./Services/LoggerService";

export default function lib (): {
    Database: DBContext,
    Authentication: Authentication
    Identity: Identity,
    Mailer: Mailer,
    Configuration: IConfiguration,
    Logger: ILogger
} {

    let config = new ConfigurationService("../SmallApp/configuration.json");
    let db = new Database(config.getConfiguration("typeormdb"));
    let ident = new Identity(config.getConfiguration("identity"), db);
    let mail = new Mailer(config.getConfiguration("mail"));

    return {
        Database: new DBContext(db),
        Authentication: new Authentication(config.getConfiguration("auth"), ident),
        Identity: ident,
        Mailer: mail,
        Configuration: config,
        Logger: new LoggerService()
    }

};