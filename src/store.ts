
import {NavigationEnd, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Location} from '@angular/common';
import {StoreService} from "./store.service";
import {State} from "monad-ts";
import {S} from "./types/s";
/**
 * Class Store - Angular service that provides monad State to Angular app.
 */
@Injectable()
export class Store<T> extends StoreService<T>{
    /**
     * @type {any}
     * @public
     */
    public routerUrlSubscription$: any;
    /**
     * keep required element of Angular app state.
     * @type {S}
     * @private
     */
    private _URL: S = {currentUrl: ['/']};

    /**
     * creates an instance of class Store.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     * @param {any} INIT_STATE - initial state of Store.
     */
    constructor(
        router: Router,
        location: Location,
        INIT_STATE: any
    ){
        super(router, location);

        /**
         * Initialize store's state. Required - _URL, optional - INIT_STATE prop.
         * @type {State}
         */
        this.state = new State({...this._URL, ...INIT_STATE});

        /**
         * Subscription for current Router URL, if URL changes then URL will change in app state store.
         * @type {Subscription}
         */
        this.routerUrlSubscription$ = this.router.events.subscribe((ev: NavigationEnd)=>{
            if(ev instanceof NavigationEnd) {
                this.state.put((v: S)=>{
                    v.currentUrl = [ev.url];
                    return v
                })
            }
        });
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.