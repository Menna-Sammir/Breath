import { useEffect, useMemo, useState, useRef } from "react";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationUrl =
    "https://api.locationiq.com/v1/autocomplete?key=pk.eac4765ae48c85d19b8b20a979534bf7&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(() => {
    return (query: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as ReturnType<typeof setTimeout>);
      }

      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }

      timerRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const res = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}q=${encodeURIComponent(query)}`
          );
          setSuggestions(res.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 500);
    };
  }, [locationUrl]);

  const handleChange = async (value: string) => {
    setInputValue(value);
    field.onChange(value);
    fetchSuggestions(value);
  };

  const handleSelect = (location: LocationIQSuggestion) => {
    const city =
      location.address?.state ||
      location.address?.city ||
      location.address?.town ||
      location.address?.village;
    const venue = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    setInputValue(venue);
    field.onChange({ city, venue, latitude, longitude });
    setSuggestions([]);
  };
  return (
    <div className="w-full">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 ${
          fieldState.error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-indigo-200"
        }`}
      />

      {fieldState.error ? (
        <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
      ) : null}

      {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}

      {suggestions.length > 0 && (
        <ul className="mt-2 max-h-60 overflow-auto border rounded-md bg-white">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 border-b last:border-b-0"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
