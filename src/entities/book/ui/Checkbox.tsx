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
  return (
    <div
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange();
      }}
      role="checkbox"
      aria-checked={isSelected}
    >
      {isSelected ? (
        <SelectedCheckboxIcon strokeWidth={1} aria-hidden="true" />
      ) : (
        <NonSelectedCheckboxIcon strokeWidth={1} aria-hidden="true" />
      )}
    </div>
  );
}
