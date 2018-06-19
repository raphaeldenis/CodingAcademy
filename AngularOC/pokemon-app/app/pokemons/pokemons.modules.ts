import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { ShadowCardDirective } from './shadow-card.directive';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';

@NgModule({
    imports: [
        //BrowserModule was including the CommonModule but since we don'need
        //to start app from this submodule, CommonModule is enough
        CommonModule
    ],
    //declarations with elements NOT FROM ROOT MODULE but from
    //specified pokemons module
    declarations: [
        ListPokemonComponent,
        DetailPokemonComponent,
        ShadowCardDirective,
        PokemonTypeColorPipe
    ],
    //empty array where we'll declare specific services for our pokemon modules
    providers: []
})
export class PokemonsModule {}