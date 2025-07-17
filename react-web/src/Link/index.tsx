import React from 'react';
import classNames from 'classnames';
import styles from './style.less';
import useLink, { UseLinkProps } from '@components/hooks/useLink';

export interface LinkProps extends UseLinkProps {
  className?: string;
  style?: React.CSSProperties;
}

const Link = (props: LinkProps & { children: React.ReactNode }) => {
  const { className, style, children } = props;

  const onClick = useLink(props);

  return (
    <span
      className={classNames(styles.link, className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Link;
