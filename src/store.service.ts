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
            this._updateState(v);
        }
        return this.state.get();
    }

    /**
     * update the app state.
     * @param {U} v - object with new values of variables of the app state.
     * @private
     */
    _updateState<U>(v: U): void {
        this.state.put(c => this._updateObject(v)(c));
    }

    /**
     * changes the values of the given object `c` with values of `v`.
     * @param {any} v - object with new values of variables of the app state.
     * @return {function(c:U)=>U}
     * @private
     */
    _updateObject<U>(v: any): Function{
        return (c: U): U=>{
            for(let k in v){
                if(v.hasOwnProperty(k)){
                    if (Object(v[k]) !== v[k]) {
                        if(c[k]!== v[k]) { c[k]= v[k]}
                    } else if (Array.isArray(v[k])) {
                        Array.from(v[k]).forEach((val: any, i: number) => {
                            if (Object(val) !== val){
                                if (c[k][i] !== val) {c[k][i] = val}
                            } else {
                                this._updateObject(val)(c[k][i])
                            }
                        })
                    } else {
                        if (v[k].constructor && v[k].constructor()) {
                            let prim = v[k].constructor();
                            if (Object(prim) !== prim){
                                if(c[k]!== v[k]) { c[k]= v[k]}
                            } else {
                                this._updateObject(v[k])(c[k]);
                            }
                        } else {
                            console.error(new Error('StoreService.manager() - update object Error!'));
                        }
                    }
                }
            }
            return c;
        };
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
