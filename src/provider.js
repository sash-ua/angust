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
export function _storeFactory(router, location, init) {
    return new Store(router, location, init);
}
/**
 * Creates a token that can be used in a DI Provider.
 * @type {InjectionToken}
 * @private
 */
export var _INITIAL_STATE = new InjectionToken('Token');
/**
 * DI Provider function.
 * @param {any} initState - initial state of Store.
 * @return {[{provide: Store, useFactory: ((router:Router, location:Location, init:any)=>Store), deps: [Router,Location,InjectionToken]},{provide: InjectionToken, useValue: any}]}
 * @private
 */
export function provideStore(initState) {
    return [
        { provide: Store, useFactory: _storeFactory, deps: [Router, Location, _INITIAL_STATE] },
        { provide: _INITIAL_STATE, useValue: initState },
    ];
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
