import React from 'react';
import classNames from 'classnames';
import styles from './style.less';
import useEllipsis, { UseEllipsisProps } from '@components/hooks/useEllipsis';

export interface EllipsisProps extends UseEllipsisProps {
  className?: string;
  style?: React.CSSProperties;
  operatorClassName?: string;
  operatorStyle?: string;
  rows?: number;
}

const Ellipsis = (props: EllipsisProps & { children: React.ReactNode }) => {
  const { contentRef, hasOperator, open, onChangeOpen } = useEllipsis(props);
  const { className, style, operatorClassName, rows = 1, children } = props;

  return (
    <div className={classNames(styles.root, className)} style={style}>
      <div
        className={classNames(styles.content, { [styles.close]: !open })}
        style={{
          WebkitLineClamp: open ? undefined : rows,
        }}
        ref={contentRef}
      >
        <div>
          {hasOperator && !open ? (
            <>
              {Array.from({ length: rows - 1 }, (_, key) => (
                <span className={styles.space} key={key}>
                  *
                </span>
              ))}
              <a
                className={classNames(operatorClassName, styles.more)}
                onClick={() => {
                  onChangeOpen(true);
                }}
              >
                查看更多
              </a>
            </>
          ) : null}
          <span>{children}</span>
          {hasOperator && open ? (
            <a
              className={classNames(operatorClassName)}
              onClick={() => {
                onChangeOpen(false);
              }}
            >
              收起
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Ellipsis;
