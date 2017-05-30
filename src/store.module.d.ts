import { ModuleWithProviders } from "@angular/core";
/**
 *  Class StoreModule - the module provides and configure Store in Angular.
 */
export declare class StoreModule {
    /**
     * configures the module's providers.
     * @param {any} INIT_STATE - initial state of Store
     * @return {ModuleWithProviders}
     */
    static forRoot(INIT_STATE: any): ModuleWithProviders;
}
