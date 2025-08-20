import { Eye, EyeOff } from "lucide-react";
import { useState, useId } from "react";
import { Theme } from "../../hooks/useTheme";

interface InputProps {
  type: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  theme: Theme;
  showPasswordToggle?: boolean;
  id?: string;
  name?: string;
  error?: string;
}

export const Input = ({
  type,
  value,
  onChange,
  placeholder = "",
  label,
  required = false,
  theme,
  showPasswordToggle = false,
  id,
  name,
  error
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;
  const generatedId = useId();
  const inputId = id || `${name || type}-${generatedId}`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            showPasswordToggle ? "pr-12" : ""
          } ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896] ${
            error ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        )}
      </div>
      {error && (
        <div id={`${inputId}-error`} className="text-red-500 text-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}; 