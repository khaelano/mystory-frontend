import { ChipInput } from '../chip'

interface KeywordInputProps {
  value: string[]
  onChange: (value: string[]) => void
  label?: string
  disabled?: boolean
}

export function KeywordInput({
  value,
  onChange,
  label = 'Keywords',
  disabled = false,
}: KeywordInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <ChipInput value={value} onChange={onChange} disabled={disabled} />
    </div>
  )
}
