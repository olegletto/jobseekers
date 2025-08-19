import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
}

export const Input = ({
  type,
  value,
  onChange,
  placeholder = "",
  label,
  required = false,
  theme,
  showPasswordToggle = false
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium">{label}</label>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            showPasswordToggle ? "pr-12" : ""
          } ${theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#00a896]`}
          placeholder={placeholder}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}; 