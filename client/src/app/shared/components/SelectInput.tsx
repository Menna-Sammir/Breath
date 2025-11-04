import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectProps,
} from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  items: { value: string; text: string }[];
  label: string;
} & UseControllerProps<T> &
  Partial<SelectProps>;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...field}
        label={props.label}
        value={field.value || ""}
        onChange={field.onChange}
      >
        {props.items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {fieldState.error ? fieldState.error.message : ""}
      </FormHelperText>
    </FormControl>
  );
}
