import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & {
  label?: string;
  placeholder?: string;
  type?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
};

export default function TextInput<T extends FieldValues>({
  label,
  placeholder,
  type,
  helperText,
  multiline = false,
  rows = 1,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  const baseClasses = `
    w-full border rounded-lg p-3 focus:outline-none focus:ring-2
    ${fieldState.error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
  `;

  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={`mb-1 font-medium ${fieldState.error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          {...field}
          placeholder={placeholder}
          rows={rows}
          className={baseClasses + " resize-none"}
        />
      ) : (
        <input
          {...field}
          placeholder={placeholder}
          type={type}
          className={baseClasses}
        />
      )}

      {fieldState.error ? (
        <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
      ) : helperText ? (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
