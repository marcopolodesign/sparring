import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors } from './constants';
import { Heading, SubHeading } from './styled-components';
import MainButton from './button';
import Dots from './Dots';

const { width, height } = Dimensions.get('screen');

const AnimatedScreen = (props) => {
  const stripeAnimation = useSharedValue(0);
  const headingOpacity = useSharedValue(0);
  const headingTranslateY = useSharedValue(80);
  const subHeadingOpacity = useSharedValue(0);
  const subHeadingTranslateY = useSharedValue(80);
  const ButtonOpacity = useSharedValue(0);
  const ButtonTranslateY = useSharedValue(80);
  const newWidth = 80 * 2;
  const customBezier = Easing.bezier(0.4, 0, 0, 1);
  const duration = 600;

  useEffect(() => {
    stripeAnimation.value = withTiming(newWidth, {
      duration: duration,
      easing: customBezier,
    });

    headingOpacity.value = withDelay(200, withTiming(1, {
      duration: duration,
      easing: customBezier,
    }));

    headingTranslateY.value = withDelay(200, withTiming(0, {
      duration: duration,
      easing: customBezier,
    }));

    subHeadingOpacity.value = withDelay(225, withTiming(1, {
      duration: duration,
      easing: customBezier,
    }));

    subHeadingTranslateY.value = withDelay(225, withTiming(0, {
      duration: duration,
      easing: customBezier,
    }));

    ButtonOpacity.value = withDelay(235, withTiming(1, {
      duration: duration,
      easing: customBezier,
    }));

    ButtonTranslateY.value = withDelay(235, withTiming(0, {
      duration: duration,
      easing: customBezier,
    }));
  }, []);

  

  const stripeStyle = useAnimatedStyle(() => {
    return {
      width: stripeAnimation.value,
    };
  });

  const headingStyle = useAnimatedStyle(() => {
    return {
      opacity: headingOpacity.value,
      flexDirection: 'row',
      transform: [{ translateY: headingTranslateY.value }],
    };
  });

  const subHeadingStyle = useAnimatedStyle(() => {
    return {
      opacity: subHeadingOpacity.value,
      paddingHorizontal: 30,
      transform: [{ translateY: subHeadingTranslateY.value }],
    };
  });

  const ButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: ButtonOpacity.value,
      paddingHorizontal: 30,
      transform: [{ translateY: ButtonTranslateY.value }],
      marginTop: 20,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Animated.View style={[styles.stripe, stripeStyle]} />
      <Animated.View style={[headingStyle]}>
        <Heading style={[styles.title, { textAlign: 'center' }]}>{props.title}
        </Heading>
        {props.loader && <Dots />}
      </Animated.View>
      <Animated.View style={[subHeadingStyle]}>
        <SubHeading textCenter size={'18px'}>
         {props.SubTitle}
        </SubHeading>
      </Animated.View>

    {props.hasCta && 
      <Animated.View style={[ButtonStyle]}>
        {/* <SubHeading>Testing</SubHeading> */}
        <MainButton willFlex color={Colors.blue} bgColor={Colors.primaryGreen} size={'18px'} ctaText={'Ir al inicio'}/>
      </Animated.View>
    }
    </View>
  );
};

export default AnimatedScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#0F5CCD',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute", 
    top: 0, 
    left: 0,
    width: width,
    height: height,
    zIndex: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F5CCD',
  },
  stripe: {
    position: 'absolute',
    left: 0,
    bottom: -500,
    width: 0,
    height: height * 2,
    backgroundColor: '#1967DA',
    transform: [{ rotate: '-50deg' }],
    opacity: 1,
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    width: width * 0.8,
  },
});
