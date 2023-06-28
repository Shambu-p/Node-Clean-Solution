import {ObjectLiteral} from "typeorm";
export default interface Category extends ObjectLiteral {
    Id: number|null
    Name: string
}