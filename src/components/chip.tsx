import { useState } from 'react'

interface ChipInputProps {
  value: string[]
  onChange: (chips: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export function ChipInput({
  value,
  onChange,
  placeholder = 'Enter keywords...',
  disabled = false,
}: ChipInputProps) {
  const [input, setInput] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      const trimmedInput = input.trim()

      if (trimmedInput && !value.includes(trimmedInput)) {
        onChange([...value, trimmedInput])
        setInput('')
      }
    } else if (e.key === 'Backspace' && input === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const handleRemoveChip = (index: number) => {
    if (disabled) return
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      <div className={`flex flex-wrap gap-2 p-2 border rounded-md bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {value.map((chip, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
          >
            {chip}
            {!disabled && (
              <button
                onClick={() => handleRemoveChip(index)}
                className="text-blue-600 hover:text-blue-800 font-bold"
                type="button"
              >
                ×
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 outline-none min-w-25 bg-transparent"
          disabled={disabled}
        />
      </div>
    </div>
  )
}