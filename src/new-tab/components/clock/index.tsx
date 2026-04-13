import { useEffect, useState } from 'react';
import { Container } from './clock.style';

interface ClockProps {
  format?: '12' | '24';
}

export const Clock = ({ format = '24' }: ClockProps) => {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === '12',
    })
  );

  useEffect(() => {
    const getTime = () =>
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: format === '12',
      });

    setTime(getTime());
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);

  return <Container>{time}</Container>;
};
