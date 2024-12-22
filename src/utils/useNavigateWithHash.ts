import { useNavigate, To } from 'react-router-dom';

export const useNavigateWithHash = () => {
  const navigate = useNavigate();

  return (to: To | number, options?: { replace?: boolean; state?: any }) => {
    const hash = window.location.hash;

    if (typeof to === 'number') {
      // Для числового значения (переход в истории назад или вперёд)
      navigate(to);
    } else if (typeof to === 'string') {
      // Если to — строка, добавляем hash явно
      navigate(to + hash, options);
    } else {
      // Если to — объект, объединяем hash с существующим
      navigate({ ...to, hash: hash || to.hash }, options);
    }
  };
};