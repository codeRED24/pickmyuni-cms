import { TextInput, TextInputProps } from "./text-input";

// Reusable DateTimeInput that connects ISO date strings (backend) with
// browser-friendly `datetime-local` input value (YYYY-MM-DDTHH:mm).
export const DateTimeInput = (
  props: Omit<TextInputProps, "type"> & {
    // allow optional custom format/parse if needed
    parseISO?: (iso?: string) => string | undefined;
    toISO?: (value?: string) => string | undefined;
  }
) => {
  const format = props.parseISO
    ? props.parseISO
    : (value: any) => {
        if (!value) return "";
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return "";
        const pad = (n: number) => n.toString().padStart(2, "0");
        const y = d.getFullYear();
        const m = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        const hh = pad(d.getHours());
        const mm = pad(d.getMinutes());
        return `${y}-${m}-${day}T${hh}:${mm}`;
      };

  const parse = props.toISO
    ? props.toISO
    : (value: any) => {
        if (!value) return undefined;
        // value is like 'YYYY-MM-DDTHH:MM' (local time). Convert to ISO string.
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return undefined;
        return parsed.toISOString();
      };

  return (
    <TextInput
      {...(props as TextInputProps)}
      type="datetime-local"
      format={format}
      parse={parse}
    />
  );
};

export default DateTimeInput;
