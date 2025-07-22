import React, { useMemo, useState } from 'react';
import { Picker } from 'antd-mobile';
import { useMemoizedFn } from 'ahooks';

export interface ColumnType<T> {
  label: React.ReactNode;
  value: T;
}

export interface SelectPickerProps<T extends string | number = any> {
  className?: string;
  style?: React.CSSProperties;
  columns?: ColumnType<T>[][] | ((value: T[]) => ColumnType<T>[][]);
  value?: T[];
  onChange?(value: T[]): void;
  children?(options: {
    onClick(): void;
    labels: React.ReactNode[];
  }): React.ReactNode;
}

const SelectPicker = <T extends string | number>(
  props: SelectPickerProps<T>
) => {
  const {
    className = '',
    style,
    columns = [],
    value = [],
    onChange,
    children,
  } = props;

  const [valueIn, setValueIn] = useState<T[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = useMemoizedFn(() => {
    setVisible(true);
    setValueIn(value);
  });

  const handleClose = useMemoizedFn(() => {
    setVisible(false);
  });

  const columnsIn = useMemo(() => {
    if (typeof columns === 'function') {
      return columns(valueIn);
    }
    return columns;
  }, [columns, valueIn]);

  const columnsOut = useMemo(() => {
    if (typeof columns === 'function') {
      return columns(value);
    }
    return columns;
  }, [columns, value]);

  const labels = useMemo(() => {
    return columnsOut.map((list, index) => {
      const val = value[index];
      const item = list.find((item) => val === item.value);
      return item?.label;
    });
  }, [value, columnsOut]);

  return (
    <>
      {children?.({ onClick: handleOpen, labels })}
      <Picker
        className={className}
        style={style}
        columns={columnsIn}
        value={valueIn}
        visible={visible}
        onClose={handleClose}
        onConfirm={onChange as any}
        onSelect={setValueIn as any}
      />
    </>
  );
};

export default SelectPicker;
