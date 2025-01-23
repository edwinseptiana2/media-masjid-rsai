import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import type { ChangeEvent } from "react";

function useCharacterLimit({ maxLength }: { maxLength: number }) {
  const [value, setValue] = useState("");
  const characterCount = value.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
  };
}

function TextareaDemo() {
  const maxLength = 50000;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="content">Textarea with characters left</Label>
      <Textarea
        id="content"
        name="content"
        value={value}
        maxLength={maxLength}
        rows={10}
        onChange={handleChange}
        aria-describedby="characters-left-textarea"
      />
      <p
        id="characters-left-textarea"
        className="mt-2 text-right text-xs text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="tabular-nums">{limit - characterCount}</span>{" "}
        characters left
      </p>
    </div>
  );
}

export { TextareaDemo };
