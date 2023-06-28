import { Repository } from "typeorm/repository/Repository";
import Category from "../Entities/Category";
import IDBTable from "./IDBTable";

export default interface IContext {
    
    Categories: Repository<Category>;

}