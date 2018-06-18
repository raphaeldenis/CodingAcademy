import { Component } from '@angular/core';

//indicate to Angular a component is a class
@Component({
    selector:'pokemon-app',
    template: `<!-- Barre de navigation -->
<nav>
    <div class="nav-wrapper teal">
      <a href="#" class="brand-logo center">pokemon-app</a>
    </div>
</nav>

<!-- Contenu des composants -->
<router-outlet></router-outlet>`
})
export class AppComponent {}

//when navigating, concerned component's template will be immediatly injected inside this