import {expect} from 'chai';
import {CreateCategoryCommand} from "Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryLogic";
import CreateCategoryValidator from 'Application/CategoryModule/Commands/CreateCategoryCommand/CreateCategoryValidator';

describe('Create Category Validation test', function () {
    
    it('should throw validation Error', function (done) {
        
        let command: CreateCategoryCommand = {
            Name: ""
        };

        try {

            let validation: CreateCategoryValidator = new CreateCategoryValidator(command);
            validation.Validate();

        } catch(error: any) {
            expect(error.message).to.have.string("parameter length should be at least");
        }

        done();

    });

    it('should not throw validation Exception', function (done) {
        
        let command: CreateCategoryCommand = {
            Name: "horses"
        };

        let validation: CreateCategoryValidator = new CreateCategoryValidator(command);
        validation.Validate();

        done();

    });



});