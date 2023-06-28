import Database from "./Database";
import Category from "Domain/Entities/Category";
import IContext from "Domain/Interfaces/IContext";
import ContextModel from "./ContextModel";
import CategoryBuilder from "./Tables/CategoryBuilder";


export default class DBContext extends ContextModel implements IContext {

    constructor(db: Database){ super(db); }

    // public Categories = this.getTable<Category>("Categories");
    public Categories = this.getTable<Category>(CategoryBuilder);

}