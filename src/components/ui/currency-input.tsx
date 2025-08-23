import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string | number;
  onChange?: (value: number, formattedValue: string) => void;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({
    value = '',
    onChange,
    onValueChange,
    placeholder = 'R$ 0,00',
    className,
    error = false,
    disabled = false,
    required = false,
    label,
    helperText,
    ...props
  }, ref) => {
    const {
      formattedValue,
      numericValue,
      handleValueChange,
      setValue
    } = useCurrencyFormat(value);

    React.useEffect(() => {
      if (value !== formattedValue) {
        setValue(value);
      }
    }, [value, formattedValue, setValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleValueChange(e);
      if (onChange) {
        onChange(numericValue, formattedValue);
      }
      if (onValueChange) {
        onValueChange(e);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={formattedValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error && "border-destructive focus-visible:ring-destructive",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            {...props}
          />

          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground text-sm">R$</span>
          </div>

          <div className="absolute inset-y-0 left-0 w-8 pointer-events-none" />
        </div>

        {helperText && (
          <p className={cn(
            "text-sm",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive">
            Por favor, insira um valor válido
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
