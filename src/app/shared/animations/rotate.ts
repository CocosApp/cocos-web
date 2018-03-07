import { trigger, state, style, transition, animate } from "@angular/animations";

export class Rotate {

    public static animation = trigger('rotateAnimation',[
        state('1',
            style(
                {transform: 'rotate({{degrees}}deg)'}), 
                {params: { degrees: '90' }}),
        state('0',
            style(
                {transform: 'rotate(0deg)'})),
        transition('1 <=> 0',[
            animate('0.3s ease-in-out')
        ])
    ]);

}
