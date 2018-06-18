import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { PageNotFoundComponent } from './page-not-found.component';


import { ShadowCardDirective} from './shadow-card.directive'; //import our directive
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';

@NgModule({
    imports:      [ BrowserModule ],
    //declare component/directive in root app module
    declarations: [ 
        AppComponent,
        ShadowCardDirective,
        PokemonTypeColorPipe,
        ListPokemonComponent,
        DetailPokemonComponent,
        PageNotFoundComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }