import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';

export interface UseLinkProps {
  /** 点击事件、提交事件 */
  onClick?(): void;
  /** 二次确认 */
  confirm?: {
    title?: React.ReactNode;
    content?: React.ReactNode;
  };
}

const useLink = (props: UseLinkProps) => {
  const { onClick, confirm } = props;

  return useMemoizedFn(() => {
    if (confirm) {
      return Modal.confirm({
        title: confirm.title,
        content: confirm.content,
        onOk: () => {
          onClick?.();
        },
      });
    }
    onClick?.();
  });
};

export default useLink;
