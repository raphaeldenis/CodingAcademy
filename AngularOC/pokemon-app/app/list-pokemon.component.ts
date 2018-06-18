import { Component, OnInit } from '@angular/core';
//Model recuperation which help types variables
import { Pokemon } from './pokemon';
//add CONST POKEMONS
import { POKEMONS } from './mock.pokemon';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';

//indicate to Angular a component is a class
@Component({
    selector: 'list-pokemon',
    templateUrl: './app/templates/list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit {

    //attribute declaration
    pokemons: Pokemon[] = null;

    constructor(private router: Router) { }

    //init attribute pokemons of component with values importe from mock.pokemons.ts
    //==>interact with component lifecycle(all ng)
    ngOnInit() {
        this.pokemons = POKEMONS;
    }

    //on event selectPokemon, display consolelog with pokenom name
    selectPokemon(pokemon: Pokemon): void {
        console.log('Vous avez selectionné ' + pokemon.name);
        let link = ['/pokemon', pokemon.id];
        this.router.navigate(link);
    }
}
