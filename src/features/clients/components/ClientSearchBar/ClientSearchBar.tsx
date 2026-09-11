import { type SyntheticEvent, useId, useRef } from 'react';

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
  placeholder = 'Search...',
  label = 'Search',
  clearLabel = 'Clear search',
  id,
  name = 'search',
}: Readonly<ClientSearchBarProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(value);
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
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {value.length > 0 && (
          <button type="button" aria-label={clearLabel} onClick={handleClear}>
            {clearLabel}
          </button>
        )}
      </form>
    </search>
  );
}
