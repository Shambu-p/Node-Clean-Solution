import { Repository } from "typeorm/repository/Repository";
import Category from "../Entities/Category";

export default interface IContext {
    
    Categories: Repository<Category>;

}