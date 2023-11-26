import {animate, state, style, transition, trigger} from "@angular/animations";

export const fadeInAnimation = trigger('fadeIn', [
    transition(':enter', [
        style({opacity: 0}),
        animate('500ms', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({opacity: 1}),
        animate('500ms', style({opacity: 0}))
    ])
]);

export const slideInAnimation = trigger('slideIn', [
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms', style({transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
        style({transform: 'translateX(0)'}),
        animate('500ms', style({transform: 'translateX(100%)'}))
    ])
]);

export const enterFromBottomLeaveLeft = trigger(
    'enterFromBottom', [
        transition(':enter', [
            style({transform: 'translateY(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
            style({transform: 'translateY(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
    ]
);

export const resizeAndOpacity = trigger('resizeAndOpacity', [
    state('void', style({ height: '0px', opacity: 0 })),
    transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
    ]),
    transition(':increment', [
        animate('300ms ease-out', style({ height: '*' }))
    ]),
    transition(':decrement', [
        animate('300ms ease-out', style({ height: '0px' }))
    ])
]);

export const resizeOnly = trigger('resize', [
    state('void', style({height: '0px'})),
    transition(':enter', [
        style({height: '0px'}),
        animate('500ms ease-out', style({height: '*'}))
    ]),
    transition(':leave', [
        style({height: '*'}),
        animate('500ms ease-out', style({height: '0px'}))
    ]),
    transition(':increment', [
        animate('500ms ease-out', style({height: '*'}))
    ]),
    transition(':decrement', [
        animate('500ms ease-out', style({height: '0px'}))
    ])
]);
