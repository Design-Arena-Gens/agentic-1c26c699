"use client";

import { FormEvent, useState } from "react";
import { clsx } from "clsx";

interface Props {
  disabled?: boolean;
  onSend: (message: string) => Promise<void>;
}

export function MessageInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim() || disabled) return;
    try {
      setIsSending(true);
      await onSend(value.trim());
      setValue("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full flex-col gap-3">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-aurora-500/20 via-transparent to-aurora-300/20 blur-2xl" />
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Transmit your query to the Lifepath Oracle..."
        rows={3}
        className="w-full resize-none rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-aurora-50 placeholder:text-aurora-100/40 focus:border-aurora-200 focus:outline-none focus:ring-0"
      />
      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={disabled || isSending || !value.trim()}
          className={clsx(
            "rounded-full border border-aurora-400/60 bg-aurora-500/30 px-6 py-2 text-xs uppercase tracking-[0.35em] text-aurora-50 transition focus:outline-none",
            (disabled || isSending || !value.trim()) && "pointer-events-none opacity-40",
            !disabled && !isSending && value.trim() && "hover:border-aurora-200 hover:bg-aurora-400/50"
          )}
        >
          {isSending ? "Channeling" : "Illuminate"}
        </button>
      </div>
    </form>
  );
}
