(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/router"), require("monad-ts"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/router", "monad-ts"], factory);
	else if(typeof exports === 'object')
		exports["Angust"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/router"), require("monad-ts"));
	else
		root["Angust"] = factory(root["@angular/core"], root["@angular/common"], root["@angular/router"], root["monad-ts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreService; });
/**
 * Class StoreService - base class for application state manipulations.
 */
var StoreService = (function () {
    /**
     * creates an instance of class StoreService.
     * @param {Router} router - DI.
     * @param {Location} location - DI.
     */
    function StoreService(router, location) {
        this.router = router;
        this.location = location;
    }
    /**
     * navigates forward in the platform's history.
     * @return {void}
     */
    StoreService.prototype.forward = function () {
        this.location.forward();
    };
    /**
     * navigates back in the platform's history.
     * @return {void}
     */
    StoreService.prototype.back = function () {
        this.location.back();
    };
    /**
     * changes current URL state in app state and then navigate with specified URL.
     * @param {any[] | string | UrlTree} commands - provided array of commands and a starting point or specified URL.
     * @param {NavigationExtras} extras - represents the extra options used during navigation.
     */
    StoreService.prototype.navigateTo = function (commands, extras) {
        this._updateState({ currentUrl: commands });
        Array.isArray(commands)
            ? this.router.navigate(this.state.get().currentUrl, extras).then(function (r) {
                if (!r)
                    console.error(new Error('StoreService.navigateTo()- navigation error'));
            })
            : this.router.navigateByUrl(this.state.get().currentUrl, extras).then(function (r) {
                if (!r)
                    console.error(new Error('StoreService.navigateTo()- navigation error'));
            });
    };
    /**
     * changes(optional) an app state and then it'll return the app state.
     * @param {U} v - object with new values of variables of the app state.
     * @return {T}
     */
    StoreService.prototype.manager = function (v) {
        if (v) {
            this._updateState(v);
        }
        return this.state.get();
    };
    /**
     * update the app state.
     * @param {U} v - object with new values of variables of the app state.
     * @private
     */
    StoreService.prototype._updateState = function (v) {
        var _this = this;
        this.state.put(function (c) { return _this._updateObject(v)(c); });
    };
    /**
     * changes the values of the given object `c` with values of `v`.
     * @param {any} v - object with new values of variables of the app state.
     * @return {function(c:U)=>U}
     * @private
     */
    StoreService.prototype._updateObject = function (v) {
        var _this = this;
        return function (c) {
            var _loop_1 = function (k) {
                if (v.hasOwnProperty(k)) {
                    if (Object(v[k]) !== v[k]) {
                        if (c[k] !== v[k]) {
                            c[k] = v[k];
                        }
                    }
                    else if (Array.isArray(v[k])) {
                        Array.from(v[k]).forEach(function (val, i) {
                            if (Object(val) !== val) {
                                if (c[k][i] !== val) {
                                    c[k][i] = val;
                                }
                            }
                            else {
                                _this._updateObject(val)(c[k][i]);
                            }
                        });
                    }
                    else {
                        if (v[k].constructor && v[k].constructor()) {
                            var prim = v[k].constructor();
                            if (Object(prim) !== prim) {
                                if (c[k] !== v[k]) {
                                    c[k] = v[k];
                                }
                            }
                            else {
                                _this._updateObject(v[k])(c[k]);
                            }
                        }
                        else {
                            console.error(new Error('StoreService.manager() - update object Error!'));
                        }
                    }
                }
            };
            for (var k in v) {
                _loop_1(k);
            }
            return c;
        };
    };
    return StoreService;
}());

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Store; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_service__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_monad_ts__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_monad_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_monad_ts__);
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
        _this.state = new __WEBPACK_IMPORTED_MODULE_4_monad_ts__["State"](__assign({}, _this._URL, INIT_STATE));
        /**
         * Subscription for current Router URL, if URL changes then URL will change in app state store.
         * @type {Subscription}
         */
        _this.routerUrlSubscription$ = _this.router.events.subscribe(function (ev) {
            if (ev instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["NavigationEnd"]) {
                _this.state.put(function (v) {
                    v.currentUrl = [ev.url];
                    return v;
                });
            }
        });
        return _this;
    }
    Store = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["Location"], Object])
    ], Store);
    return Store;
}(__WEBPACK_IMPORTED_MODULE_3__store_service__["a" /* StoreService */]));

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 *  Class StoreModule - the module provides and configure Store in Angular.
 */
var StoreModule = (function () {
    function StoreModule() {
    }
    StoreModule_1 = StoreModule;
    /**
     * configures the module's providers.
     * @param {any} INIT_STATE - initial state of Store
     * @return {ModuleWithProviders}
     */
    StoreModule.forRoot = function (INIT_STATE) {
        return {
            ngModule: StoreModule_1,
            providers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__provider__["a" /* provideStore */])(INIT_STATE)
        };
    };
    StoreModule = StoreModule_1 = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({})
    ], StoreModule);
    return StoreModule;
    var StoreModule_1;
}());

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_store_service__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return __WEBPACK_IMPORTED_MODULE_0__src_store_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_store_module__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "StoreModule", function() { return __WEBPACK_IMPORTED_MODULE_1__src_store_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_store__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return __WEBPACK_IMPORTED_MODULE_2__src_store__["a"]; });
/**
 * @description
 * Entry point for all public APIs of the Angust package.
 */



//Copyright (c) 2017 Alex Tranchenko. All rights reserved. 


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export _storeFactory */
/* unused harmony export _INITIAL_STATE */
/* harmony export (immutable) */ __webpack_exports__["a"] = provideStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__angular_common__);




/**
 * factory function.
 * @param {Router} router - DI.
 * @param {Location} location - DI.
 * @param {any} init - initial state of Store.
 * @return {Store}
 * @private
 */
function _storeFactory(router, location, init) {
    return new __WEBPACK_IMPORTED_MODULE_2__store__["a" /* Store */](router, location, init);
}
/**
 * Creates a token that can be used in a DI Provider.
 * @type {InjectionToken}
 * @private
 */
var _INITIAL_STATE = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["InjectionToken"]('Token');
/**
 * DI Provider function.
 * @param {any} initState - initial state of Store.
 * @return {[{provide: Store, useFactory: ((router:Router, location:Location, init:any)=>Store), deps: [Router,Location,InjectionToken]},{provide: InjectionToken, useValue: any}]}
 * @private
 */
function provideStore(initState) {
    return [
        { provide: __WEBPACK_IMPORTED_MODULE_2__store__["a" /* Store */], useFactory: _storeFactory, deps: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_3__angular_common__["Location"], _INITIAL_STATE] },
        { provide: _INITIAL_STATE, useValue: initState },
    ];
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ })
/******/ ]);
});