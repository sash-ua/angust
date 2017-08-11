import {NavigationExtras, Router, UrlTree} from "@angular/router";
import { Location } from '@angular/common';
import {State} from "monad-ts";

/**
 * Class StoreService - base class for application state manipulations.
 */
export class StoreService<T>{
    /**
     * @type {State<any>}
     * @public
     */
    public state: State<any>;

    /**
     * creates an instance of class StoreService.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     */
    constructor(
        protected router: Router,
        protected location: Location
    ){}

    /**
     * navigates forward in the platform's history.
     * @return {void}
     */
    forward(){
        this.location.forward();
    }
    /**
     * navigates back in the platform's history.
     * @return {void}
     */
    back(){
        this.location.back();
    }

    /**
     * changes current URL state in app state and then navigate with specified URL.
     * @param {any[] | string | UrlTree} commands - provided array of commands and a starting point or specified URL.
     * @param {NavigationExtras} extras - represents the extra options used during navigation.
     */
    navigateTo(commands: any[] | string | UrlTree, extras?: NavigationExtras){
        this._updateState({currentUrl: commands});
        Array.isArray(commands)
            ? this.router.navigate(this.state.get().currentUrl, extras).then((r: any)=>{
            if(!r) console.error(new Error('StoreService.navigateTo()- navigation error'));
        })
            : this.router.navigateByUrl(this.state.get().currentUrl, extras).then((r: any)=>{
            if(!r) console.error(new Error('StoreService.navigateTo()- navigation error'));
        });
    }

    /**
     * changes(optional) an app state and then it'll return the app state.
     * @param {U} v - object with new values of variables of the app state.
     * @return {T}
     */
    manager<U>(v?: U ): T {
        if(v) {
            this._updateState(v)
        }
        return this.state.get();
    }

    /**
     * changes an app state.
     * @param {U} v - object with new values of variables of the app state.
     * @private
     */
    _updateState<U>(v: U): void {
        this.state.put(c => this._changeObject(v)(c));
    }

    /**
     * changes the values of the given object `c` with values of `v`.
     * @param {U} v - object with new values of variables of the app state.
     * @return {function(c:U)=>U}
     * @private
     */
    _changeObject<U>(v: U): Function{
        return (c: U): U=>{
            for(let k in v){
                if(v.hasOwnProperty(k)){
                    c[k]= v[k];
                }
            }
            return c;
        };
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
