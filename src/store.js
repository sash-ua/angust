var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Store = (function (_super) {
    __extends(Store, _super);
    /**
     * creates an instance of class Store.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     * @param {any} INIT_STATE - initial state of Store.
     */
    function Store(router, location, INIT_STATE) {
        var _this = _super.call(this, router, location) || this;
        /**
         * keep required element of Angular app state.
         * @type {S}
         * @private
         */
        _this._URL = { currentUrl: ['/'] };
        /**
         * Initialize store's state. Required - _URL, optional - INIT_STATE prop.
         * @type {State}
         */
        _this.state = new State(__assign({}, _this._URL, INIT_STATE));
        /**
         * Subscription for current Router URL, if URL changes then URL will change in app state store.
         * @type {Subscription}
         */
        _this.routerUrlSubscription$ = _this.router.events.subscribe(function (ev) {
            if (ev instanceof NavigationEnd) {
                _this.state.put(function (v) {
                    v.currentUrl = [ev.url];
                    return v;
                });
            }
        });
        return _this;
    }
    Store = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router,
            Location, Object])
    ], Store);
    return Store;
}(StoreService));
export { Store };
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
