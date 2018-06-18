import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShadowCardDirective} from './shadow-card.directive'; //import our directive
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ AppComponent, ShadowCardDirective, PokemonTypeColorPipe ], //declare ShadowCardDirective in the root app module
    bootstrap:    [ AppComponent ]
})
export class AppModule { }