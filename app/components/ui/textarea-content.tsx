import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router";
import { randomUUID } from "crypto";

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

function TextareaContent() {
  const maxLength = 50000;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="content">
        Content (Format Markdown){" "}
        <Link
          to={`/gallery/${Math.random().toString(36).substring(2, 9)}`}
          target="_blank"
        >
          <span className="ml-96 text-white text-xs bg-slate-500 p-1 rounded-full">
            Upload Gambar untuk Konten
          </span>
        </Link>
      </Label>
      <Textarea
        id="content"
        name="content"
        value={value}
        maxLength={maxLength}
        rows={15}
        onChange={handleChange}
        aria-describedby="characters-left-textarea"
        className="overflow-auto"
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

export { TextareaContent };
