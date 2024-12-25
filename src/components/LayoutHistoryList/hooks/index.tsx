import { useEffect } from 'react';

import { fetchCardLayoutHistory } from 'toolkit/actions/cardLayoutHistoryActions';
import { useAppDispatch, useAppSelector } from 'toolkit/hooks';

export const useCardLayoutsHistory = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.layoutHistory);

  useEffect(() => {
    dispatch(fetchCardLayoutHistory());
  }, [dispatch]);

  return { data, loading, error };
};
