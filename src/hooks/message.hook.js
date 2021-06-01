import { useCallback } from 'react';

const useMessage = () => useCallback((text) => {
  if (text) {
    alert(text);
  }
}, []);

export default useMessage;
