var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavigationEnd, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Location } from '@angular/common';
import { StoreService } from "./store.service";
import { State } from "monad-ts";
/**
 * Class Store - Angular service that provides monad State to Angular app.
 */
let Store = class Store extends StoreService {
    /**
     * creates an instance of class Store.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     * @param {any} INIT_STATE - initial state of Store.
     */
    constructor(router, location, INIT_STATE) {
        super(router, location);
        /**
         * keep required element of Angular app state.
         * @type {S}
         * @private
         */
        this._URL = { currentUrl: ['/'] };
        /**
         * Initialize store's state. Required - _URL, optional - INIT_STATE prop.
         * @type {State}
         */
        this.state = new State(Object.assign({}, this._URL, INIT_STATE));
        /**
         * Subscription for current Router URL, if URL changes then URL will change in app state store.
         * @type {Subscription}
         */
        this.routerUrlSubscription$ = this.router.events.subscribe((ev) => {
            if (ev instanceof NavigationEnd) {
                this.state.put((v) => {
                    v.currentUrl = [ev.url];
                    return v;
                });
            }
        });
    }
};
Store = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router,
        Location, Object])
], Store);
export { Store };
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
