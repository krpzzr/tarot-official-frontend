import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'toolkit/store';  // Тип корневого состояния

// Кастомный хук для dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Кастомный хук для selector
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);