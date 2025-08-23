import { useState, useCallback } from 'react';

interface UseCurrencyFormatReturn {
  formattedValue: string;
  numericValue: number;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string | number) => void;
  clearValue: () => void;
}

export const useCurrencyFormat = (initialValue: string | number = ''): UseCurrencyFormatReturn => {
  // Declarar as funções primeiro, antes de usá-las nos useState
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  const parseCurrencyToNumber = useCallback((currencyString: string): number => {
    if (!currencyString) return 0;
    const cleanString = currencyString
      .replace(/[R$\s.]/g, '')
      .replace(',', '.');
    const number = parseFloat(cleanString);
    return isNaN(number) ? 0 : number;
  }, []);

  const formatFromCents = useCallback((cents: number): string => {
    return formatCurrency(cents / 100);
  }, [formatCurrency]);

  // Agora usar as funções nos useState
  const [formattedValue, setFormattedValue] = useState<string>(() => {
    if (typeof initialValue === 'number') {
      return formatCurrency(initialValue);
    }
    return initialValue;
  });

  const [numericValue, setNumericValue] = useState<number>(() => {
    if (typeof initialValue === 'number') {
      return initialValue;
    }
    return parseCurrencyToNumber(initialValue);
  });

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setFormattedValue('');
      setNumericValue(0);
      return;
    }
    const numericString = inputValue.replace(/\D/g, '');
    if (numericString === '') {
      setFormattedValue('');
      setNumericValue(0);
      return;
    }
    const numberInCents = parseInt(numericString);
    const formatted = formatFromCents(numberInCents);
    setFormattedValue(formatted);
    setNumericValue(numberInCents / 100);
  }, [formatFromCents]);

  const setValue = useCallback((value: string | number) => {
    if (typeof value === 'number') {
      setFormattedValue(formatCurrency(value));
      setNumericValue(value);
    } else {
      const numeric = parseCurrencyToNumber(value);
      setFormattedValue(value);
      setNumericValue(numeric);
    }
  }, [formatCurrency, parseCurrencyToNumber]);

  const clearValue = useCallback(() => {
    setFormattedValue('');
    setNumericValue(0);
  }, []);

  return {
    formattedValue,
    numericValue,
    handleValueChange,
    setValue,
    clearValue
  };
};
