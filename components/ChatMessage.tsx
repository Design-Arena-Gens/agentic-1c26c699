"use client";

import { clsx } from "clsx";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

interface Props {
  message: ChatMessage;
}

const roleColors: Record<ChatRole, string> = {
  user: "from-aurora-400/80 to-aurora-300/30 border-aurora-200/30",
  assistant: "from-aurora-700/70 to-indigo-950/40 border-indigo-400/30",
  system: "from-slate-800/80 to-slate-900/50 border-slate-500/40"
};

const roleLabels: Record<ChatRole, string> = {
  user: "Seeker",
  assistant: "Oracle",
  system: "Constellation"
};

export function ChatMessageBubble({ message }: Props) {
  return (
    <div
      className={clsx(
        "group relative flex w-full max-w-3xl flex-col gap-2 rounded-3xl border bg-gradient-to-br p-[1px]",
        roleColors[message.role]
      )}
    >
      <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-slate-950/80 p-4 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-aurora-200/70">
          <span>{roleLabels[message.role]}</span>
          <span className="font-mono text-[10px] text-white/30">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-aurora-50/90">{message.content}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition duration-700 group-hover:opacity-100">
        <div className="h-full w-full rounded-3xl bg-gradient-radial from-white/30 via-transparent to-transparent" />
      </div>
    </div>
  );
}
