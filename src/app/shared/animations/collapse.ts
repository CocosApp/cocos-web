import { trigger, state, style, transition, animate } from "@angular/animations";

export class Collapse {
    public static animation = trigger('collapseAnimation',[
        state('1',style({height:0})),
        state('0',style({height:'*'})),
        transition('1 <=> 0',[
            animate('0.3s ease-in-out')
        ])
    ])
}
