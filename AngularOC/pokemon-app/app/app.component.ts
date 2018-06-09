import { Component, OnInit } from '@angular/core';
//Model recuperation which help types variables
import { Pokemon } from './pokemon';
//add CONST POKEMONS
import { POKEMONS } from './mock.pokemon';

//indicate to Angular a component is a class
@Component({
    selector:'pokemon-app',
    templateUrl: './app/templates/app.component.html',
})
export class AppComponent implements OnInit { 

    //attribute declaration
    pokemons: Pokemon[] = null;

    //init attribute pokemons of component with values importe from mock.pokemons.ts
    //==>interact with component lifecycle(all ng)
    ngOnInit() {
        this.pokemons = POKEMONS;
    }

    //on event selectPokemon, display consolelog with pokenom name
    selectPokemon(pokemon: Pokemon) {
        console.log('Vous avez selectionné ' +pokemon.name);
    }
}
