import React from 'react';
import classNames from 'classnames';
import styles from './style.less';
import { Spin } from 'antd';

export interface LoadingProps {
  className?: string;
  style?: React.CSSProperties;
  show?: boolean;
}

const Loading = (props: LoadingProps) => {
  const { className, style, show } = props;

  if (!show) {
    return null;
  }

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <Spin className={styles.icon} />
    </div>
  );
};

export default Loading;
