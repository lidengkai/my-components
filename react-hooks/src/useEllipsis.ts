import { useEffect, useRef, useState } from 'react';
import { useMemoizedFn, useSize } from 'ahooks';
import useValue, { UseValue } from '@components/hooks/useValue';

export interface UseEllipsisProps extends UseValue<'open', boolean> {
  dependencyList: any[];
}

const useEllipsis = (props: UseEllipsisProps) => {
  const { dependencyList } = props;

  const [open, onChangeOpen] = useValue(props, 'open', false);

  const [hasOperator, setHasOperator] = useState<boolean>(false);
  const [openVal, setOpenVal] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const contentSize = useSize(contentRef);

  const timer = useRef<number>();

  const render = useMemoizedFn(() => {
    timer.current && cancelAnimationFrame(timer.current);
    setOpenVal(false);
    setHasOperator(false);
    timer.current = requestAnimationFrame(() => {
      if (contentRef.current) {
        const { clientHeight, scrollHeight } = contentRef.current;
        setHasOperator(scrollHeight > clientHeight);
      }
    });
  });

  useEffect(() => {
    return () => {
      timer.current && cancelAnimationFrame(timer.current);
    };
  }, []);

  useEffect(() => {
    render();
  }, [contentSize?.width, ...dependencyList]);

  useEffect(() => {
    if (hasOperator) {
      setOpenVal(open);
    }
  }, [hasOperator, open]);

  return {
    contentRef,
    hasOperator,
    open: openVal,
    onChangeOpen,
  };
};

export default useEllipsis;
