import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { StoreService } from "./store.service";
/**
 * Class Store - Angular service that provides monad State to Angular app.
 */
export declare class Store<T> extends StoreService<T> {
    /**
     * @type {any}
     * @public
     */
    routerUrlSubscription$: any;
    /**
     * keep required element of Angular app state.
     * @type {S}
     * @private
     */
    private _URL;
    /**
     * creates an instance of class Store.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     * @param {any} INIT_STATE - initial state of Store.
     */
    constructor(router: Router, location: Location, INIT_STATE?: any);
}
