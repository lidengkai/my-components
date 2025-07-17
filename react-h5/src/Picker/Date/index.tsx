import React, { useMemo, useState } from 'react';
import classnames from 'classnames';
import styles from './style.less';
import { DatePicker as D } from 'antd-mobile';
import { useMemoizedFn } from 'ahooks';

export interface DatePickerProps {
  className?: string;
  style?: React.CSSProperties;
  value?: Date | null;
  onChange?(value: Date): void;
  types?: Array<'year' | 'month' | 'day' | 'hour' | 'minute'>;
  children?(options: { onClick(): void; value: Date | null }): React.ReactNode;
}

const DatePicker = (props: DatePickerProps) => {
  const {
    className = '',
    style,
    value = null,
    onChange,
    types,
    children,
  } = props;

  const [valueIn, setValueIn] = useState<Date | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = useMemoizedFn(() => {
    setVisible(true);
    setValueIn(value);
  });

  const handleClose = useMemoizedFn(() => {
    setVisible(false);
  });

  const typeClass = useMemo(() => {
    if (types?.length) {
      return types.map((item) => styles[item]);
    }
    return [styles.all];
  }, [types]);

  return (
    <>
      {children?.({ onClick: handleOpen, value })}
      <D
        className={classnames(styles.root, ...typeClass, className)}
        style={style}
        value={valueIn}
        visible={visible}
        onClose={handleClose}
        onConfirm={onChange}
        precision="minute"
        renderLabel={(type, data) => {
          switch (type) {
            case 'year':
              return data + '年';
            case 'month':
              return data + '月';
            case 'day':
              return data + '日';
            case 'hour':
              return data + '时';
            case 'minute':
              return data + '分';
            case 'second':
              return data + '秒';
            default:
              return data;
          }
        }}
      />
    </>
  );
};

export default DatePicker;
