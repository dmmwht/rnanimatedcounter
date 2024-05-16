import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {useCount} from '../context/CounterContext';

const Counter = () => {
  const textUp = useRef(new Animated.Value(0)).current;
  const textDown = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const {count, increment, decrement, reset} = useCount();
  const [direction, setDirection] = useState(null);

  const handleUp = () => {
    textUp.setValue(50);
    opacityAnim.setValue(0);
    increment();
    setDirection(textUp);

    Animated.parallel([
      Animated.timing(textUp, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDown = () => {
    textDown.setValue(-50);
    opacityAnim.setValue(0);
    decrement();
    setDirection(textDown);

    Animated.parallel([
      Animated.timing(textDown, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/madface.png')}
      />
      <Text style={styles.title}>Mad Counter</Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={{...styles.roundedButton, backgroundColor: 'green'}}
          onPress={handleUp}>
          <Text style={styles.roundedButtonText}>+</Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.counterContainer,
            backgroundColor:
              direction === null || count === 0
                ? 'black'
                : direction === textUp
                ? 'green'
                : 'crimson',
          }}>
          <Animated.Text
            style={{
              ...styles.counterText,
              transform: [
                {translateY: direction === textUp ? textUp : textDown},
              ],
              opacity: opacityAnim,
            }}>
            {count}
          </Animated.Text>
        </View>
        <TouchableOpacity
          style={{...styles.roundedButton, backgroundColor: 'crimson'}}
          onPress={handleDown}>
          <Text style={styles.roundedButtonText}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.resetContainer}
        disabled={count === 0}
        onPress={handleReset}>
        <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'black',
  },
  innerContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  roundedButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 27,
  },

  counterContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 60,
    fontWeight: '900',
    color: '#f5f5f8',
  },
  resetContainer: {
    width: 150,
    height: 50,
    backgroundColor: '#F3CA52',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  resetText: {
    color: 'black',
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: 5,
  },
});

export default Counter;
