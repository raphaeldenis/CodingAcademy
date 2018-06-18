import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ListPokemonComponent } from './list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon.component';
import { PageNotFoundComponent } from './page-not-found.component';

//declaration of variable which contains list of all routes in an array
const appRoutes: Routes = [
    { path: 'pokemons', component: ListPokemonComponent },
    { path: 'pokemon/:id', component: DetailPokemonComponent },
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
//exporting routes through a module
export class AppRoutingModule { }