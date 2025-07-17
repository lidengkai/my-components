import React from 'react';
import classnames from 'classnames';
import styles from './style.less';
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { useMemoizedFn } from 'ahooks';

export interface NavProps {
  className?: string;
  style?: React.CSSProperties;
  noBack?: boolean;
  icon?: React.ReactNode;
}

const Nav = (props: NavProps & { children?: React.ReactNode }) => {
  const { className, style, noBack, icon, children } = props;
  const navigate = useNavigate();

  const click = useMemoizedFn(() => {
    navigate(-1);
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fixed}>
          <NavBar
            className={classnames(styles.root, className)}
            style={style}
            onBack={click}
            backIcon={noBack ? false : undefined}
            right={icon}
          >
            {children}
          </NavBar>
        </div>
      </div>
    </>
  );
};

export default Nav;
