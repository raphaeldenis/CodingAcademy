import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon';

export class DetailPokemonComponent implements OnInit {

    pokemons: Pokemon[] = null; //List of pokemons 
    pokemon: Pokemon = null; //pokemon to display in template

    constructor(private route: ActivatedRoute, private router: Router) {}
    //injecting 'route' to get url's parameters and 'router' to redirect user

    //void tell TS that this method doesnt have a return value!!
    ngOnInit(): void {
        //initiate our pokemons list
        this.pokemons = POKEMONS;
    
        //get 'id' parameters from url
        let id = +this.route.snapshot.params['id'];

        //parsing through pokemon's array to find matching 'id'
        for (let i = 0; i < this.pokemons.length; i++) {
            //if 'id' == 'id' we affect this pokemon to component's property
            if(this.pokemons[i].id == id) {
                this.pokemon = this.pokemons[i];
            }
        }
    }

    //Method used to redirect user to main app page
    //void tell TS that this method doesnt have a return value!!
    goBack(): void {
        this.router.navigate(['/pokemons']);
    }

}