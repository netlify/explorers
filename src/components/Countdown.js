import { useState, useEffect } from 'react';

const Countdown = ({ number }) => {
  const [countdown, setCountdown] = useState(number);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  return <span>{countdown}</span>;
};

export default Countdown;
