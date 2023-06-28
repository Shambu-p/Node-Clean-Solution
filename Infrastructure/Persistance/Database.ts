import { DataSource } from "typeorm";
import CategoryBuilder from "./Tables/CategoryBuilder";
import ConfigurationService from "../Services/ConfigurationService";

export default class Database {
    Source: DataSource;
    constructor(configuration: ConfigurationService){
        this.Source = new DataSource(configuration.getConfiguration("db"));
    }
}