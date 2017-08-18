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
     * changes an app state.
     * @param {U} v - object with new values of variables of the app state.
     * @private
     */
    StoreService.prototype._updateState = function (v) {
        var _this = this;
        this.state.put(function (c) { return _this._changeObject(v)(c); });
    };
    /**
     * changes the values of the given object `c` with values of `v`.
     * @param {U} v - object with new values of variables of the app state.
     * @return {function(c:U)=>U}
     * @private
     */
    StoreService.prototype._changeObject = function (v) {
        return function (c) {
            for (var k in v) {
                if (v.hasOwnProperty(k)) {
                    c[k] = v[k];
                }
            }
            return c;
        };
    };
    return StoreService;
}());
export { StoreService };
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
