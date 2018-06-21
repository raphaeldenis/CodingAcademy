import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from './pokemons.services';
import { Pokemon } from './pokemon';

@Component({
    selector: 'pokemon-form',
    templateUrl: 'app/pokemons/pokemon-form.component.html'
})
export class PokemonFormComponent implements OnInit {

    @Input() pokemon: Pokemon; //entry required is a pokemon
    types: Array<string>; //possible types: 'Eau','Feu' etc...

    constructor(
        private pokemonsService: PokemonsService,
        private router: Router) { }
    
    ngOnInit() {
        //initialise type property
        this.types = this.pokemonsService.getPokemonTypes();
    }
        
    //Check if type in param belongs to the pokemon being edited
    hasType(type: string): boolean {
        let index = this.pokemon.types.indexOf(type);
        if (~index) return true;
        return false;
    }

    //Method called when user add/delete a type to pokemon in edition
    selectType($event: any, type: string): void {
        let checked = $event.target.checked;
        if ( checked ) {
            this.pokemon.types.push(type);
        } else {
            let index = this.pokemon.types.indexOf(type);
            if (~index) {
                this.pokemon.types.splice(index, 1);
            }
        }
    }

    //Method called when form is submitted
    onSubmit(): void {
        console.log("Submit form !");
        let link = ['/pokemon', this.pokemon.id];
        this.router.navigate(link);
    }
    
}