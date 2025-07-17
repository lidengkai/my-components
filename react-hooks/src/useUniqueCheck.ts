import { useMemo } from 'react';

const useUniqueCheck = <T>(options: { checks: T[] }) => {
  const { checks } = options;

  return useMemo(() => {
    return checks.map((item) => {
      return checks.filter((t) => t !== item);
    });
  }, [checks]);
};

export default useUniqueCheck;
