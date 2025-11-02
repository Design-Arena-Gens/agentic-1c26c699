"use client";

import { useEffect, useState } from "react";

export interface ConnectionConfig {
  endpoint: string;
  apiKey: string;
  model: string;
  temperature: number;
}

interface Props {
  value: ConnectionConfig;
  onChange: (value: ConnectionConfig) => void;
}

const STORAGE_KEY = "cosmic-bridge-settings";

export function ConnectionSettings({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ConnectionConfig;
        onChange(parsed);
      } catch (error) {
        console.error("Failed to parse stored settings", error);
      }
    }
  }, [onChange]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [value]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-aurora-200 transition hover:border-white/30 hover:bg-white/10"
      >
        {open ? "Close Bridge" : "Open Bridge"}
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-4 w-[320px] rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-sm shadow-xl backdrop-blur-lg">
          <h2 className="text-xs uppercase tracking-[0.3em] text-aurora-200/80">Connection Bridge</h2>
          <p className="mt-1 text-[11px] text-aurora-100/60">
            Configure the tunnel to your local oracle. Ensure CORS is enabled on the local endpoint.
          </p>
          <div className="mt-4 space-y-3">
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-aurora-100/70">Endpoint</span>
              <input
                value={value.endpoint}
                onChange={(event) => onChange({ ...value, endpoint: event.target.value })}
                placeholder="http://localhost:5000/api/chat"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-aurora-50 placeholder:text-aurora-100/40 focus:border-aurora-300/60 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-aurora-100/70">API Key</span>
              <input
                value={value.apiKey}
                onChange={(event) => onChange({ ...value, apiKey: event.target.value })}
                placeholder="sk-..."
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-aurora-50 placeholder:text-aurora-100/40 focus:border-aurora-300/60 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-aurora-100/70">Model</span>
              <input
                value={value.model}
                onChange={(event) => onChange({ ...value, model: event.target.value })}
                placeholder="gpt-4"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-aurora-50 placeholder:text-aurora-100/40 focus:border-aurora-300/60 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-aurora-100/70">Temperature</span>
              <input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={value.temperature}
                onChange={(event) => onChange({ ...value, temperature: Number(event.target.value) })}
                className="accent-aurora-400"
              />
              <div className="text-right text-[11px] text-aurora-100/50">{value.temperature.toFixed(1)}</div>
            </label>
          </div>
        </div>
      ) : null}
    </div>
  );
}
