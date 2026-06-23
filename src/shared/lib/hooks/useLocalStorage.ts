import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === 'undefined') return initialValue;
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue] as const;
}
