import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon';

@Component({
    selector:'pokemon-app',
    template: '<h1>Pokemon</h1>',
})
export class AppComponent implements OnInit { 

    //get data from external file
    pokemons: Pokemon[] = null;

    //on init, charge data from const POKEMONS to modele pokemons
    ngOnInit() {
        this.pokemons = POKEMONS;
    }

    //on event selectPokemon, display consolelog
    selectPokemon(pokemon: Pokemon) {
        console.log('VOus avez selectionné ' +pokemon.name);
    }
}
