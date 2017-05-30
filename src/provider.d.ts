import { Router } from "@angular/router";
import { InjectionToken } from "@angular/core";
import { Store } from "./store";
import { Location } from '@angular/common';
/**
 * factory function.
 * @param {Router} router - DI.
 * @param {Location} location - DI.
 * @param {any} init - initial state of Store.
 * @return {Store}
 * @private
 */
export declare function _storeFactory(router: Router, location: Location, init: any): Store<{}>;
/**
 * Creates a token that can be used in a DI Provider.
 * @type {InjectionToken}
 * @private
 */
export declare const _INITIAL_STATE: InjectionToken<{}>;
/**
 * DI Provider function.
 * @param {any} initState - initial state of Store.
 * @return {[{provide: Store, useFactory: ((router:Router, location:Location, init:any)=>Store), deps: [Router,Location,InjectionToken]},{provide: InjectionToken, useValue: any}]}
 * @private
 */
export declare function provideStore(initState: any): ({
    provide: typeof Store;
    useFactory: (router: Router, location: Location, init: any) => Store<{}>;
    deps: (InjectionToken<{}> | typeof Router | typeof Location)[];
} | {
    provide: InjectionToken<{}>;
    useValue: any;
})[];
