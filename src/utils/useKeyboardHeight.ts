import { useEffect, useState } from 'react';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = initialHeight - currentHeight;

      if (heightDiff > 100) {
        setKeyboardHeight(heightDiff); // Высота клавиатуры
      } else {
        setKeyboardHeight(0); // Клавиатура закрыта
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialHeight]);

  return keyboardHeight;
};

export default useKeyboardHeight;
