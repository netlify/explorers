import { useState, useEffect } from 'react';
import { useUserState } from '@context/user';
// Hook for using media queries for conditional rendering
// Usage example:
// let isPageWide = useMediaQuery('(min-width: 800px)')

export function useAchievement() {
  const [achievements, setAchievements] = useState(null);
  const { user } = useUserState();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    // https://nextjs.org/docs/api-reference/next/router
    const getAchievement = async () => {
      console.log('getAchievement called (separate hook)');
      const result = await fetch('.netlify/functions/get-user-achievement', {
        method: 'POST',
        body: JSON.stringify({ user_id: user.id }),
      }).then((res) => res.json());
      setAchievements(result.achievements);
      setStatus('loaded');
      return result;
    };
    // console.log(user);
    if (user?.id) {
      //   console.log(user.id);
      getAchievement();
    }

    return () => {};
  }, []);

  const state = {
    achievements,
    status,
  };

  return state;
}
