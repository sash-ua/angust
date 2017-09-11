[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://github.com/sash-ua/angust)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/sash-ua/angust)


# Angust

Angust is Angular4+ module(service) implements monad State to manipulate app's state. [Example app](https://github.com/sash-ua/gen_drift_monad-ts_a4).

**Introduction**
* [Intro](#intro)

## Setup
* [Installation](#installation)
* [Setup](#setup)

**Methods**
* [back()](#back)
* [forward()](#forward)
* [manager()](#manager)
* [navigateTo()](#navigateto)

## Intro

Angust is Angular service implements a unidirectional dataflow for manipulation with app state in Angular4+ apps. The package will be useful in development of middle or small applications.

## Installation
```
npm install angust monad-ts --save-dev
```
or
```
 yarn add angust monad-ts
```

## Setup

**1.** **SystemJS** Configure `systemjs.config.js` to register the module.
```
SystemJS.config({
	map:{
		...
		'angust': 'node_modules/angust/lib/angust.umd.js'
		...
	}
})
```
**2.** **WebPack** No special configuration.

**3.** Create an initialization state object to initialize Store. This object should contain complete range of defined
 to store elements. It should be statically analyzable for AOT, therefore it shouldn't have calculated values for AOT
 compatibility.
 
**NB** After initialization we can't add / remove objects' key, only to change values.
```
export const INIT_STATE = {
	svg_attrs: []
	}
```

**4.** In your app's main module, import an initialization state object(`INIT_STATE`) and use StoreModule.forRoot
(INIT_STATE) to provide it to Angular.
```
import {StoreModule} from "angust";
import {INIT_STATE} from "./store/store.init";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(INIT_STATE)
  ]
})
export class AppModule {}
```
**5.** You can then inject the Store service into your components and services.
 ```
 import {Store} from "angust";
 
 export interface StateStore{
     svg_attrs: Array<[string, string | number]>;
 }
 
 @Component({
	selector: 'my-app',
	template: `
	  <div>Test</div>
	`})
 
 class MyAppComponent {
 constructor(
         protected store: Store<StateStore>
     ){
         this.varSetter(this.store.manager({svg_attrs: [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', SpecificService.dimension(0.35, 0.4)]]}));
     }
 }
 ```

[UP](#angust)

## Methods

#### Back
Navigates back in the platform's history.
```
	this.store.back();
```

#### Forward
Navigates forward in the platform's history.
```
	this.store.forward();
```

#### Manager
It changes(optional) an app state and/or return the app state.
```
	// State - {test:[g, b], next: 'g'}
	// Return the app state only.
	console.log(this.store.manager());  // {test:[g, b], next: 'g'}
	
	// Change and return the app state.
	console.log(this.store.manager({test: 'f'}));   // {test: 'f', next: 'g'}
```

#### NavigateTo
It changes current URL state in app state and then navigate with specified URL.
Takes array of string or string and extras specified Angular Router.navigate() or Router.navigateByUrl().

If first argument is array of string function use Router.navigate() to navigate. Navigate based on the provided array of commands and a starting point. If no starting route is provided, the navigation is absolute.
```
	this.store.navigateTo(['team', 33, 'user', 11]);
	this.store.navigateTo(['team', 33, 'user', 11], {relativeTo: route});
	// Navigate without updating the URL
	this.store.navigateTo(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});

```
If first argument is string function use Router.navigateByUrl() to navigate. Navigate based on the provided url. This navigation is always absolute.
```
	this.store.navigateTo("/team/33/user/11");
	// Navigate without updating the URL
	this.store.navigateTo("/team/33/user/11", {skipLocationChange: true});
```

[UP](#angust)

## License

Angust is copyright (c) 2017 - present Alex Tranchenko tranchenkoa@gmail.com .

Angust is a free software, licensed under the Apache License, Version 2.0. See the file LICENSE.md in this
distribution for more details.
