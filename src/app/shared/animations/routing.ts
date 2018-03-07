import { trigger, transition, query, style, animate, state, group, animateChild } from "@angular/animations";

export class Routing {
    public static animation = trigger('routingAnimation',[
        // transition(':enter',[]),
        transition('loginPage => adminPage',[
            group([
                query(':enter .admin', [
                    style({ background : 'red' }),
                    animate('5s ease-in-out', style({ background : 'red' })),
                    animateChild()
                ],{ optional: false }),
                query( ':leave .signin__left',[
                    style({ transform : 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform : 'translateX(-100%)' })),
                    animateChild()
                ],{ optional: true }),
                query( ':leave .signin__right',[
                    style({ transform : 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform : 'translateX(100%)' })),
                    animateChild()
                ],{ optional: true })
            ])
        ]),
        transition('adminPage => loginPage',[
            group([
                query(':leave', [
                    style({ opacity : 1 }),
                    animate('0.5s ease-in-out', style({ opacity : 0 })),
                    animateChild()
                ],{ optional: true }),
                query( ':enter .signin__left',[
                    style({ transform : 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', style({ transform : 'translateX(0%)' }))
                ],{ optional: true }),
                query( ':enter .signin__right',[
                    style({ transform : 'translateX(100%)' }),
                    animate('0.5s ease-in-out', style({ transform : 'translateX(0%)' }))
                ],{ optional: true })
            ])
        ]),
        transition('* => *',[
            group([
                query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.5s', style({ opacity: 1 })),
                    animateChild()
                ],
                { optional: true }),
                query(':leave', [
                    animate('0.5s', style({ opacity: 0 })),
                    animateChild()
                ],
                { optional: true })
            ])
        ])
    ]);
}
