import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PokemonsModule } from './pokemons/pokemons.module'

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        //MODULE ORDER ARE VITAL!!! (for routes declaration)
        BrowserModule,
        PokemonsModule,
        AppRoutingModule
     ],
    //declare component/directive in root app module
    declarations: [ 
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }