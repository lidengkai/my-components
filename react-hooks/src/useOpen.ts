import useValue, { UseValue } from '@components/hooks/useValue';

export interface UseOpenProps<T extends boolean>
  extends UseValue<'value', boolean> {
  allowNull?: T;
}

const useOpen = <T extends boolean = false>(props: UseOpenProps<T>) => {
  const [value, onChange] = useValue(props, 'value');

  const { allowNull } = props;

  return {
    value: (allowNull && value === undefined ? null : value) as T extends false
      ? boolean
      : boolean | null,
    onChange,
  };
};

export default useOpen;
