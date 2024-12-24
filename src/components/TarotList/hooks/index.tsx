import { useEffect } from 'react';
import { fetchCardLayouts } from 'toolkit/actions/cardLayoutActions';
import { useAppDispatch, useAppSelector } from 'toolkit/hooks';

export const useCardLayouts = (type?: string) => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.layouts);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchCardLayouts());
    }
  }, [dispatch, type]);

  return { data, loading, error };
};
