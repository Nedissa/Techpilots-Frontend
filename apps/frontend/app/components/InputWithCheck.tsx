interface InputWithCheckProps {
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function InputWithCheck({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  className = '',
  style,
  ...props
}: InputWithCheckProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 pr-10 focus:outline-none border-2 border-transparent focus:border-black bg-gray-50 ${className}`}
        style={style}
        {...props}
      />
      {value && (
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}
