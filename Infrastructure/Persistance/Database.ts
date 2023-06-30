import { DataSource } from "typeorm";
import CategoryBuilder from "./Tables/CategoryBuilder";

export default class Database {
    Source: DataSource;
    constructor(configuration: any) {
        configuration.entities = Database.build([]);
        this.Source = new DataSource(configuration);
        this.Source.initialize();
    }

    private static build(builders: any[]) {
        builders.push(CategoryBuilder);
        return builders;
    }
}