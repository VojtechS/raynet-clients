import { type SyntheticEvent, useId, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { MIN_SEARCH_LENGTH } from '../../constants/clientSearch.ts';
import styles from './ClientSearchBar.module.scss';

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
    <search className={styles.clientSearchBar}>
      <form className={styles['clientSearchBar__form']} onSubmit={handleSubmit}>
        <label className="labelVisuallyHidden" htmlFor={inputId}>
          {label}
        </label>

        <Search
          className={styles['clientSearchBar__searchIcon']}
          aria-hidden="true"
          size={12}
          strokeWidth={3}
        />

        <input
          className={styles['clientSearchBar__input']}
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

        {value.length > 0 && (
          <button
            className={styles['clientSearchBar__clearButton']}
            type="button"
            aria-label={clearLabel}
            onClick={handleClear}
          >
            <X aria-hidden="true" size={14} strokeWidth={3} />
          </button>
        )}

        {isTooShort && (
          <p
            className={styles['clientSearchBar__validationMessage']}
            id={validationMessageId}
            role="alert"
          >
            Min. {MIN_SEARCH_LENGTH} znaky
          </p>
        )}
      </form>
    </search>
  );
}
