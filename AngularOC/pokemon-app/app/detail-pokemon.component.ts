import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock.pokemon';

@Component({
    selector: 'detail-pokemon',
    template: `
  <div *ngIf="pokemon" class="row">
  <div class="col s12 m8 offset-m2">
  <h2 class="header center">{{ pokemon.name }}</h2>
  <div class="card horizontal hoverable">
    <div class="card-image">
      <img [src]="pokemon.picture">
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <table class="bordered striped">
          <tbody>
            <tr>
              <td>Nom</td>
              <td><strong>{{ pokemon.name }}</strong></td>
            </tr>
            <tr>
              <td>Points de vie</td>
              <td><strong>{{ pokemon.hp }}</strong></td>
            </tr>
            <tr>
              <td>Dégâts</td>
              <td><strong>{{ pokemon.cp }}</strong></td>
            </tr>
            <tr>
              <td>Types</td>
              <td>
                <span *ngFor="let type of pokemon.types" class="{{ type | pokemonTypeColor }}">{{ type }}</span>
              </td>
            </tr>
            <tr>
              <td>Date de création</td>
              <td><em>{{ pokemon.created | date:"dd/MM/yyyy" }}</em></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-action">
        <a (click)="goBack()">Retour</a>
      </div>
    </div>
  </div>
  </div>
  </div>
  <h4 *ngIf='!pokemon' class="center">Aucun pokémon à afficher !</h4>
  `
})
export class DetailPokemonComponent implements OnInit {

    pokemons: Pokemon[] = null;
    pokemon: Pokemon = null;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.pokemons = POKEMONS;

        let id = +this.route.snapshot.params['id'];
        for (let i = 0; i < this.pokemons.length; i++) {
            if (this.pokemons[i].id == id) {
                this.pokemon = this.pokemons[i];
            }
        }
    }

    goBack(): void {
        this.router.navigate(['/pokemons']);
    }

}