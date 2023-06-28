import Category from "Domain/Entities/Category";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CategoryBuilder implements Category {

    @PrimaryGeneratedColumn()
    Id: number | null;

    @Column()
    Name: string;

}