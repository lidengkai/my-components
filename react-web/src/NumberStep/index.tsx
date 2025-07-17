import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { Tag } from 'antd';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import useNumber, { UseNumberProps } from '@components/hooks/useNumber';

export interface NumberStepProps
  extends Omit<UseNumberProps<number>, 'hasNull'> {
  className?: string;
  style?: React.CSSProperties;
  step?: { value: number; label: React.ReactNode }[];
}

const NumberStep = (props: NumberStepProps) => {
  const { onChange, inputProps } = useNumber({
    ...props,
    hasNull: false,
  });

  const { className, style, step } = props;

  const stepNodes = useMemo(() => {
    const left: React.ReactNode[] = [];
    const right: React.ReactNode[] = [];
    if (step) {
      step.forEach((item) => {
        const { value, label } = item;
        (value < 0 ? left : right).push(
          <Tag
            className={classNames(styles.item, styles.tag)}
            key={value}
            onClick={() => onChange(value)}
          >
            {label}
          </Tag>
        );
      });
    } else {
      left.push(
        <MinusCircleFilled
          className={classNames(styles.item, styles.icon)}
          onClick={() => onChange(-1)}
        />
      );
      right.push(
        <PlusCircleFilled
          className={classNames(styles.item, styles.icon)}
          onClick={() => onChange(1)}
        />
      );
    }
    return { left, right };
  }, [step]);

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <div className={styles.steps}>{stepNodes.left}</div>
      <div className={styles.content}>
        <span>{inputProps.value}</span>
        <input {...inputProps} />
      </div>
      <div className={styles.steps}>{stepNodes.right}</div>
    </div>
  );
};

export default NumberStep;
