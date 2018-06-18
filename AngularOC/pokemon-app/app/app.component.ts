import { Component } from '@angular/core';

//indicate to Angular a component is a class
@Component({
    selector:'pokemon-app',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}

//when navigating, concerned component's template will be immediatly injected inside this