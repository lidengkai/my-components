import React, { useMemo, useState } from 'react';
import { Picker } from 'antd-mobile';
import { useMemoizedFn } from 'ahooks';

export interface SelectPickerProps<T extends string | number = any> {
  className?: string;
  style?: React.CSSProperties;
  columns?: { label: React.ReactNode; value: T }[][];
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

  const labels = useMemo(() => {
    return columns.map((list, index) => {
      const item = list.find((item) => value.includes(item.value));
      return item?.label;
    });
  }, [value, columns]);

  return (
    <>
      {children?.({ onClick: handleOpen, labels })}
      <Picker
        className={className}
        style={style}
        columns={columns}
        value={valueIn}
        visible={visible}
        onClose={handleClose}
        onConfirm={onChange as any}
      />
    </>
  );
};

export default SelectPicker;
