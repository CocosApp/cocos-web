import { trigger, transition, query, style, animate, state, group } from "@angular/animations";

export class FadeIn {

    public static animationTrigger = 
    // trigger('fadeIn', [
    //     transition('* => *', [
    //         query( ':enter',[
    //             style({ opacity : 0 })
    //         ],
    //         { optional: true }),
    //         query( ':leave',[
    //             style({ opacity : 1 }),
    //             animate('0.2s', style({ opacity : 0 }))
    //         ],
    //         { optional: true }),
    //         query( ':enter',[
    //             style({ opacity : 0 }),
    //             animate('0.2s', style({ opacity : 1 }))
    //         ],
    //         { optional: true }),
    //     ])
    // ]);
    // trigger('fadeIn', [
    //     // route 'enter' transition
    //     transition(':enter', [

    //         // styles at start of transition
    //         style({ opacity: 0 }),

    //         // animation and styles at end of transition
    //         animate('10s 0.5s', style({ opacity: 1, 'z-index': 9999 }))
    //     ]),
    //     transition(':leave', [

    //         // styles at start of transition
    //         style({ opacity: 1 }),

    //         // animation and styles at end of transition
    //         animate('10s', style({ opacity: 0, 'z-index': 1 }))
    //     ]),
    // ]);
    // trigger('fadeIn', [
    //     // state('void', style({position:'fixed', width:'100%'}) ),
    //     // state('*', style({position:'fixed', width:'100%'}) ),
    //     // transition(':enter', [  // before 2.1: transition('void => *', [
    //     //   style({transform: 'translateX(100%)'}),
    //     //   animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    //     // ]),
    //     // transition(':leave', [  // before 2.1: transition('* => void', [
    //     //   style({transform: 'translateX(0%)'}),
    //     //   animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    //     // ])
    //     state('void', style({ opacity: 0, transform: 'scale(0.5)'}) ),
    //     state('*', style({ opacity: 1 , transform: 'scale(1)'}) ),
    //     transition(':enter', [  // before 2.1: transition('void => *', [
    //     //   style({transform: 'translateX(100%)'}),
    //         animate('0.5s 0.5s ease-in-out')
    //     ]),
    //     transition(':leave', [  // before 2.1: transition('* => void', [
    //     //   style({transform: 'translateX(0%)'}),
    //         animate('0.5s ease-in-out')
    //     ])
    //   ]);
    trigger('fadeIn', [
        state('void', style({ opacity: 0}) ),
        state('*', style({ opacity: 1 , transform: 'scale(1)'}) ),
        transition(':enter', [
            animate('0.5s ease-in-out')
        ]),
        transition(':leave', [      
            // query('.login-opaque-bk',[
            //     style({ height: '0%', opacity: '0' }),
            //     animate('0.3s ease-in-out', style({ height: '100%', opacity: '1' }))
            // ]
            // ,{ optional: true }),        
            group([
                query( '.login-left',[
                style({ transform : 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform : 'translateX(-100%)' }))
                ],
                { optional: true }),
                query( '.login-right',[
                    style({ transform : 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform : 'translateX(100%)' }))
                ],
                { optional: true }),
            ]),            
        ]),
      ]);
}
