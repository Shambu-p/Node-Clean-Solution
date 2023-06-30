import Category from "Domain/Entities/Category";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CategoryBuilder implements Category {

    @PrimaryGeneratedColumn()
    declare Id: number | null;

    @Column()
    declare Name: string;

}