import { Component } from '@angular/core';

@Component({
    selector: 'pokemon-app',
    //when navigating, concerned component's template will be immediatly injected inside this balise
    template: `<router-outlet></router-outlet>`
})
export class AppComponent { }