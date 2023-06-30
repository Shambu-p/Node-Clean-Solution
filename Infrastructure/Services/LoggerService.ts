
import ILogger from "Domain/Interfaces/ILogger";
import LogLevel from "Domain/Enums/LogLevel";

export default class LoggerService implements ILogger {
    
    log(log: any): void {

        if(log.message == LogLevel.ERROR) {
            console.error(log.message);
        }

        console.error(log.message);

    }

}