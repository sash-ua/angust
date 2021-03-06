var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { provideStore } from "./provider";
/**
 *  Class StoreModule - the module provides and configure Store in Angular.
 */
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule_1 = StoreModule;
    /**
     * configures the module's providers.
     * @param {any} INIT_STATE - initial state of Store
     * @return {ModuleWithProviders}
     */
    StoreModule.forRoot = function (INIT_STATE) {
        return {
            ngModule: StoreModule_1,
            providers: provideStore(INIT_STATE)
        };
    };
    StoreModule = StoreModule_1 = __decorate([
        NgModule({})
    ], StoreModule);
    return StoreModule;
    var StoreModule_1;
}());
export { StoreModule };
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
