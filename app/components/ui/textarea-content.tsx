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
    defaultValue: value,
    value,
    characterCount,
    handleChange,
    maxLength,
  };
}

function TextareaContent({ defaultValue }: { defaultValue: string }) {
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
      <Label htmlFor="content" className="flex justify-between mr-10">
        Content (Format Markdown)
        <Link
          className="flex text-slate-950 text-xs bg-slate-300 px-2 py-1 rounded-full hover:bg-slate-400 hover:text-slate-950 "
          to={`/gallery/${urlToken}`}
          onClick={() =>
            setUrlToken(Math.random().toString(36).substring(2, 9))
          }
          target="_blank"
        >
          <span>📸 Upload Gambar untuk Konten</span>
        </Link>
      </Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={defaultValue}
        value={value}
        maxLength={maxLength}
        rows={15}
        onChange={handleChange}
        aria-describedby="characters-left-textarea"
        className="overflow-auto p-2 mt-3"
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
