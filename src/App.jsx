import React from 'react';
import {View} from 'react-native';
import Counter from './components/Counter';
import CounterProvider from './context/CounterContext';

const App = () => {
  return (
    <CounterProvider>
      <View style={{flex: 1}}>
        <Counter />
      </View>
    </CounterProvider>
  );
};

export default App;
