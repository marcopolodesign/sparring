import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Heading } from './styled-components';


const Dots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length < 3) {
          return prevDots + '.';
        } else {
          return '';
        }
      });
    }, 700); // Adjust the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return <Heading style={{
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }}
  >{dots}
  </Heading>;
};

export default Dots;
