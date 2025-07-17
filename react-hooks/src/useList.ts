import { useMemoizedFn } from 'ahooks';
import { useEffect, useState } from 'react';

const useList = <T extends any[]>(props: {
  show?: boolean;
  onLoad?(): Promise<{ data?: T }>;
}) => {
  const { show = true, onLoad } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>();
  const [list, setList] = useState<T>([] as any);

  const load = useMemoizedFn(async () => {
    if (onLoad) {
      try {
        setLoading(true);
        setError(undefined);
        const { data } = await onLoad();
        setList(data ?? ([] as any));
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        setError(new Error(e));
      }
    }
  });

  useEffect(() => {
    if (show) {
      load();
    }
  }, [show]);

  return { loading, error, list };
};

export default useList;
