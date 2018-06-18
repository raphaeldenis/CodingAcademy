import { Component, OnInit } from '@angular/core';
//Model recuperation which help types variables
import { Pokemon } from './pokemon';
//add CONST POKEMONS
import { POKEMONS } from './mock.pokemon';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';

//indicate to Angular a component is a class
@Component({
    selector: 'list-pokemon',
    template: `
    <h1 class='center'>Pokémons</h1>
      <div class='container'>
        <div class="row">
        <div *ngFor='let pokemon of pokemons' class="col s6 m4">
          <div class="card horizontal" (click)="selectPokemon(pokemon)" pkmn-shadow-card>
            <div class="card-image">
              <img [src]="pokemon.picture">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>{{ pokemon.name }}</p>
                <p><small>{{ pokemon.created | date:"dd/MM/yyyy" }}</small></p>
                <span *ngFor='let type of pokemon.types' class="{{ type | pokemonTypeColor }}">{{ type }}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  `
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
