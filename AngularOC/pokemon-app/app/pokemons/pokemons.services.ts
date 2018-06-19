import { Injectable } from '@angular/core';
import { Pokemon} from './pokemon';
import { POKEMONS } from './mock.pokemons';

//injectable indicates that this service can have others dependances
@Injectable()
export class PokemonsService {

    // Return all pokemons
    getPokemons(): Pokemon[] {
        return POKEMONS;
    }

    //Return pokemon with id as param
    getPokemon(id: number) {
        let pokemons = this.getPokemons();
        
        for(let index = 0; index < pokemons.length; index++) {
            if(id === pokemons[index].id) {
                return pokemons[index];
            }
        }
    }
}