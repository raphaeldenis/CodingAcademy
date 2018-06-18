//Each time an HTML element is detected with attribut pkmn-shadow-card, ANGULAR creates a new instance of
//our directive and inject DOM element and how to modify it in the directiv's constructor
//Here it s a grey bordure and 180px height.
//==>two methods: setBorder and setHeight
//also border will change color when user pass mouse over element

//ElementRef is an object representing the DOM element to which we apply our Directive (access through constructor's parameters)
//Renderer is an object allowing us to change style from DOM element on which the directive is applied
import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

//pkmn-shadow-card is our CSS selector=>Our directive will apply to all DOM elements with shadow-card attributs
@Directive({ selector: '[pkmn-shadow-card]' })
export class ShadowCardDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
        this.setBorder('#f5f5f5');
        this.setHeight('180px');
    }

    //imported from angularcore
    @HostListener('mouseenter') onMouseEnter() {
        this.setBorder('#009688');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setBorder('#f5f5f5');
    }


    private setBorder(color: string) {
        let style = 'solid 4px' + color;
        this.renderer.setElementStyle(this.el.nativeElement, 'border', style);
    }

    private setHeight(height: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'height', height);
    }

}