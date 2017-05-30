import { NavigationExtras, Router, UrlTree } from "@angular/router";
import { Location } from '@angular/common';
import { State } from "monad-ts";
/**
 * Class StoreService - base class for application state manipulations.
 */
export declare class StoreService<T> {
    protected router: Router;
    protected location: Location;
    /**
     * @type {State<any>}
     * @public
     */
    state: State<any>;
    /**
     * creates an instance of class StoreService.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     */
    constructor(router: Router, location: Location);
    /**
     * navigates forward in the platform's history.
     * @return {void}
     */
    forward(): void;
    /**
     * navigates back in the platform's history.
     * @return {void}
     */
    back(): void;
    /**
     * changes current URL state in app state and then navigate with specified URL.
     * @param {any[] | string | UrlTree} commands - provided array of commands and a starting point or specified URL.
     * @param {NavigationExtras} extras - represents the extra options used during navigation.
     */
    navigateTo(commands: any[] | string | UrlTree, extras?: NavigationExtras): void;
    /**
     * changes(optional) an app state and then it'll return the app state.
     * @param {U} v - object with new values of variables of the app state.
     * @return {T}
     */
    manager<U>(v?: U): T;
    /**
     * changes an app state.
     * @param {U} v - object with new values of variables of the app state.
     * @private
     */
    _updateState<U>(v: U): void;
    /**
     * changes the values of the given object `c` with values of `v`.
     * @param {U} v - object with new values of variables of the app state.
     * @return {function(c:U)=>U}
     * @private
     */
    _changeObject<U>(v: U): Function;
}
