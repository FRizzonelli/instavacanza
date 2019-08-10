declare module 'react-native-card-stack-swiper' {
    import React from 'react';
    import { NativeMethodsMixinStatic, ViewProperties } from 'react-native';

    export interface CardStackProperties extends ViewProperties {
        loop?: boolean;
        verticalSwipe?: boolean;
        renderNoMoreCards?: () => any;
        onSwipedLeft: (index: number) => void;
        onSwipedRight: (index: number) => void;
        onSwipedTop: (index: number) => void;
        ref?: (ref: any) => void;
    }

    export interface CardStackStatic extends NativeMethodsMixinStatic, React.ComponentClass<CardStackProperties> { }

    var CardStack: CardStackStatic;
    type CardStack = CardStackStatic;

    export default CardStack;

    export interface CardProperties extends ViewProperties {

    }

    export interface CardStatic extends NativeMethodsMixinStatic, React.ComponentClass<CardProperties> { }

    var Card: CardStatic;
    type Card = CardStatic;

    export { Card }
}
