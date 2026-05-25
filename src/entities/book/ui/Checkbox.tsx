import {
  Square as NonSelectedCheckboxIcon,
  CheckSquare as SelectedCheckboxIcon,
} from 'lucide-react';

interface CheckboxProps {
  isSelected: boolean;
  className?: string;
  onChange: () => void;
}

export function Checkbox({ isSelected, className, onChange }: CheckboxProps) {
  const CheckboxIcon = isSelected
    ? SelectedCheckboxIcon
    : NonSelectedCheckboxIcon;

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange();
      }}
      role="checkbox"
      aria-checked={isSelected}
    >
      <CheckboxIcon strokeWidth={1} aria-hidden="true" />
    </button>
  );
}
