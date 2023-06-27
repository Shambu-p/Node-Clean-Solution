
import { expect } from "chai";
import { CreateCategoryCommand } from "Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import Category from "Domain/Entities/Category";
import TestSetup from "../TestSetup";

before(() => {
    TestSetup.Setup();
});

afterEach(() => {
    TestSetup.DatabaseInfrastructure.reverse();
});

describe('Category Module Integration Test', function () {
    
    it('Category creator logic test', async function () {
        
        let command: CreateCategoryCommand = {
            Name: "Test Category 1"
        }

        await TestSetup.Application.categoryModule.createCategoryRequest(command);

        let found_length = (await TestSetup.DatabaseInfrastructure.Categories.Records()).Where((single: Category) => single.Name == command.Name).Count;

        expect(found_length).to.be.equal(1);

    });

});