
import ABMediator from "./src/AbMediator";
import HandlerResolver from "./src/HandlerResolver";
import IHandler from "./src/IHandler";
import Injector from "./src/Injector";
import NiceValidation from "./src/Validator/NiceValidation";
import ValidationException from "./src/Validator/ValidationException";
import 'reflect-metadata';

function Type(type: any): (target: any) => void {
    return Reflect.metadata("design:type", type);
}

function ReturnType(type: any): (target: any) => void {
    return Reflect.metadata("design:returntype", type);
}

function ParamTypes(...types: any): (target: any) => void {
    return Reflect.metadata("design:paramtypes", types);
}

export {
    ParamTypes as Dependencies,
    Injector as Builder,
    HandlerResolver as HandlerResolver,
    IHandler as IHandler,
    ABMediator as ABMediator,
    NiceValidation as NiceValidation,
    ValidationException as ValidationException
};