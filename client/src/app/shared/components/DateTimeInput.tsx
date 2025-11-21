import React from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue" | "onChange" | "value"> & {
    helperText?: React.ReactNode;
    label?: React.ReactNode;
  };

export default function DateTimeInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  helperText,
  label,
  ...inputProps
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const formatDateToLocalInput = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const valueString = field.value
    ? formatDateToLocalInput(new Date(field.value as Date | string | number))
    : "";

  const { className, id, ...rest } = inputProps as React.InputHTMLAttributes<HTMLInputElement>;
  const inputId = id ?? (name as unknown as string);

  const inputClassName = `${className ?? ""} w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
    error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
  }`;

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type="datetime-local"
        value={valueString}
        onChange={(e) => {
          const v = e.target.value;
          field.onChange(v ? new Date(v) : null);
        }}
        onBlur={field.onBlur}
        className={inputClassName}
        {...rest}
      />
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
}
