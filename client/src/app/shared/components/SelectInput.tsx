import React from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & {
  items: { value: string; text: string }[];
  label: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "value" | "onChange" | "defaultValue">;

export default function SelectInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  items,
  label,
  ...selectProps
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const { className, ...rest } = selectProps as React.SelectHTMLAttributes<HTMLSelectElement>;

  const selectClass = `${className ?? ""} w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 ${
    error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
  }`;

  return (
    <div className="w-full">
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...rest}
        name={name}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
        className={selectClass}
      >
        <option value="">Select...</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      ) : null}
    </div>
  );
}
