
import {ModuleWithProviders, NgModule} from "@angular/core";
import {provideStore} from "./provider";

/**
 *  Class StoreModule - the module provides and configure Store in Angular.
 */
@NgModule({})
export class StoreModule {
    /**
     * configures the module's providers.
     * @param {any} INIT_STATE - initial state of Store
     * @return {ModuleWithProviders}
     */
    static forRoot(INIT_STATE: any): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: provideStore(INIT_STATE)
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
