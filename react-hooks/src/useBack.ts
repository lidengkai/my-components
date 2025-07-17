import { useMemoizedFn } from 'ahooks';
import { useNavigate } from 'react-router-dom';

export interface UseBackProps {
  onBack?(): void;
}

const useBack = (props: UseBackProps) => {
  const navigate = useNavigate();

  const { onBack } = props;

  return useMemoizedFn(() => {
    if (typeof onBack === 'function') {
      return onBack();
    }
    navigate(-1);
  });
};

export default useBack;
