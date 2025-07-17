import { useMemo, useState } from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';

export interface UseNumberProps<T extends number | null> {
  defaultValue?: number;
  value?: T;
  onChange?(value: T): void;
  min?: number;
  max?: number;
  hasNull?: boolean;
}

const useNumber = <T extends number | null>(props: UseNumberProps<T>) => {
  const { min, max, hasNull = true } = props;

  const [value, setValue] = useControllableValue<T>(props);
  const [temp, setTemp] = useState('');
  const [focus, setFocus] = useState(false);

  const maxLength = useMemo(() => {
    const minSize = `${min ?? ''}`.length;
    const maxSize = `${max ?? ''}`.length;
    const size = Math.max(minSize, maxSize);
    return size ? size + 1 : undefined;
  }, [min, max]);

  const handleChange = useMemoizedFn((nextValue: number) => {
    if (min !== undefined && nextValue < min) {
      nextValue = min;
    } else if (max !== undefined && nextValue > max) {
      nextValue = max;
    }
    if (nextValue !== value) {
      setValue(nextValue as T);
    }
  });

  const onChange = useMemoizedFn((val: number) => {
    handleChange((value || 0) + val);
  });

  const onInput = useMemoizedFn((e: any) => {
    setTemp(e.target.value);
  });

  const onFocus = useMemoizedFn(() => {
    setFocus(true);
    setTemp(`${value ?? ''}`);
  });

  const onBlur = useMemoizedFn(() => {
    setFocus(false);
    const val = temp.trim() ? Number(temp) : NaN;
    if (isNaN(val) && hasNull) {
      return setValue(null as T);
    }
    handleChange(val || 0);
  });

  return {
    value,
    onChange,
    inputProps: {
      value: focus ? temp : value,
      onChange: onInput,
      onFocus,
      onBlur,
      maxLength,
    },
  };
};

export default useNumber;
