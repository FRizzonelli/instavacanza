import { debounce } from 'lodash';
import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

export interface IPlatformTouchableProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const PlatformTouchable = (props: IPlatformTouchableProps): JSX.Element => {
  const {
    //   raised,
    onPress,
    children,
    style,
    disabled
  } = props;

  // All Android Buttons should have the ripple effect
  if (Platform.OS === 'android') {
    // Raised Android buttons need a white ripple
    // if (raised) {
    //   return (
    //     <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(Colors.WHITE)}>
    //       <View style={[styles.button, styles.buttonRaised]}>{children}</View>
    //     </TouchableNativeFeedback>
    //   );
    // }

    // Normal Android buttons get a gray ripple
    return (
      <TouchableNativeFeedback
        onPress={onPress ? debounce(onPress, 500, { leading: true, trailing: false }) : undefined}
        // background={TouchableNativeFeedback.Ripple(Colors.GRAY_200)}
        useForeground={true}
        disabled={disabled}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  // iOS raised buttons use TouchableHighlight
  //   if (raised) {
  //     return (
  //       <TouchableHighlight style={[styles.button, styles.buttonRaised]} underlayColor="#0052AC" onPress={onPress}>
  //         {children}
  //       </TouchableHighlight>
  //     );
  //   }

  // Normal iOS buttons use TouchableOpacity
  return (
    <TouchableOpacity
      onPress={onPress ? debounce(onPress, 500, { leading: true, trailing: false }) : undefined}
      disabled={disabled}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

export default PlatformTouchable;
