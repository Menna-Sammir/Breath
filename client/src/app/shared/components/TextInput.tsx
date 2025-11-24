import {
  type FieldValues,
  useController,
  type UseControllerProps,
  useFormContext,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label?: string;
} & UseControllerProps<T> &
  React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput<T extends FieldValues>({
  control,
  label,
  ...props
}: Props<T>) {
  const formContext = useFormContext<T>();
  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error(
      "Text input must be used within a form provider or passed as props"
    );
  }

  const { field, fieldState } = useController({
    ...props,
    control: effectiveControl,
  });

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        {...field}
        id={props.name}
        value={field.value || ""}
        className={`
          w-full rounded-lg border p-2 outline-none transition
          ${
            fieldState.error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-300 focus:border-blue-500"
          }
        `}
      />

      {fieldState.error?.message && (
        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
      )}
    </div>
  );
}
