import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router";

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

  const [urlToken, setUrlToken] = useState(
    Math.random().toString(36).substring(2, 9)
  );

  const handleClick = (): void => {
    const token = Math.random().toString(36).substring(2, 9);
    setUrlToken(token);
  };

  const token = Math.random().toString(36).substring(2, 9);
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="content">
        Content (Format Markdown){" "}
        <Link to={`/gallery/${urlToken}`} onClick={handleClick} target="_blank">
          <span className="ml-96 text-white text-xs bg-slate-500 px-2 py-1 rounded-full hover:bg-slate-600 hover:text-slate-950">
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
