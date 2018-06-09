import { Component, OnInit } from '@angular/core';
//Model recuperation which help types variables
import { Pokemon } from './pokemon';
//add CONST POKEMONS
import { POKEMONS } from './mock.pokemon';

@Component({
    selector:'pokemon-app',
    template: '<h1>Pokemon test</h1>',
})
export class AppComponent implements OnInit { 

    //attribute declaration
    pokemons: Pokemon[] = null;

    //init attribute pokemons of component with values importe from mock.pokemons.ts
    ngOnInit() {
        this.pokemons = POKEMONS;
    }

    //on event selectPokemon, display consolelog with pokenom name
    selectPokemon(pokemon: Pokemon) {
        console.log('VOus avez selectionné ' +pokemon.name);
    }
}
