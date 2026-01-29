import type { ChangeEvent } from "react";
import type { FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: string;
  min?: string;
  error?: FieldError;
  onlyNumeric?: boolean; // 숫자만 입력 가능하게
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  step,
  min,
  error,
  onlyNumeric = false,
}: FormInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onlyNumeric && type === "number") {
      const inputValue = e.target.value;

      // 빈 값은 허용
      if (inputValue === "") {
        onChange(e);
        return;
      }

      // 숫자와 소수점만 허용, 소수점은 1개만
      const regex = /^-?\d*\.?\d*$/;
      const dotCount = (inputValue.match(/\./g) || []).length;

      if (regex.test(inputValue) && dotCount <= 1) {
        onChange(e);
      }
      // 유효하지 않은 입력은 무시
    } else {
      onChange(e);
    }
  };

  return (
    <label className="block text-sm">
      <span className="mb-1 block text-neutral-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        step={step}
        min={min}
        className={`mt-1 w-full rounded-lg border ${
          error ? "border-red-500" : "border-neutral-700"
        } bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 transition-colors`}
      />
      {error && <span className="mt-1 block text-xs text-red-400">{error.message}</span>}
    </label>
  );
}
