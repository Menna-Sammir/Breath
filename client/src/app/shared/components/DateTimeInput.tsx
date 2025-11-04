import { type TextFieldProps } from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
    <DateTimePicker
      {...props}
      value={field.value ? new Date(field.value as Date | string | number) : null}
      onChange={(value) => field.onChange(value ?? null)}
      sx={{ width: "100%" }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error
            ? fieldState.error.message
            : props.helperText,
        },
      }}
    />
  );
}
