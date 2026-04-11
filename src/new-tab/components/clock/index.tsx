import { useEffect, useState } from 'react';
import { Container } from './clock.style';

export const Clock = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Container>{time}</Container>;
};
