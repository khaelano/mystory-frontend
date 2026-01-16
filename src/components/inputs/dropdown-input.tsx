import type { SelectHTMLAttributes } from 'react'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownInputProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  label?: string
  placeholder?: string
  error?: string
}

export function DropdownInput({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  error,
  className = '',
  ...props
}: DropdownInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
