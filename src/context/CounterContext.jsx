import {createContext, useContext, useState} from 'react';

const CounterContext = createContext();
export const useCount = () => useContext(CounterContext);

const CounterProvider = ({children}) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  const data = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CounterContext.Provider value={data}>{children}</CounterContext.Provider>
  );
};

export default CounterProvider;
