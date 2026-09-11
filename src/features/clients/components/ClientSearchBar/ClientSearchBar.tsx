import { type SyntheticEvent, useId, useRef } from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants/search.ts';

export interface ClientSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  label?: string;
  clearLabel?: string;
  id?: string;
  name?: string;
}

export function ClientSearchBar({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Hledat...',
  label = 'Hledat',
  clearLabel = 'Vymazat hledání',
  id,
  name = 'search',
}: Readonly<ClientSearchBarProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const validationMessageId = `${inputId}-validation-message`;
  const inputRef = useRef<HTMLInputElement>(null);
  const isTooShort = value.trim().length > 0 && value.trim().length < MIN_SEARCH_LENGTH;

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = value.trim();

    if (trimmedValue.length > 0 && trimmedValue.length < MIN_SEARCH_LENGTH) {
      return;
    }

    onSubmit?.(trimmedValue);
  }

  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
    inputRef.current?.focus();
  }

  return (
    <search>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>{label}</label>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          minLength={MIN_SEARCH_LENGTH}
          aria-invalid={isTooShort}
          aria-describedby={isTooShort ? validationMessageId : undefined}
          autoComplete="off"
        />
        {isTooShort && (
          <p id={validationMessageId} role="alert">
            Min. {MIN_SEARCH_LENGTH} znaky
          </p>
        )}
        {value.length > 0 && (
          <button type="button" aria-label={clearLabel} onClick={handleClear}>
            {clearLabel}
          </button>
        )}
      </form>
    </search>
  );
}
