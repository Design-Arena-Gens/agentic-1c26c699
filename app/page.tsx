"use client";

import { useCallback, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { ChatMessage, ChatMessageBubble } from "../components/ChatMessage";
import { MessageInput } from "../components/MessageInput";
import { ConnectionConfig, ConnectionSettings } from "../components/ConnectionSettings";

const initialSystemPrompt =
  "You are the Lifepath 33 Oracle, a compassionate numerology guide. Offer luminous, spiritually grounded insights with clarity and warmth. Reference master number symbolism, cosmic metaphors, and practical guidance.";

const initialAssistantGreeting =
  "Welcome, luminous Seeker. Lifepath 33 resonates through empathy, cosmic stewardship, and creative service. What question shall we illuminate together?";

const defaultConfig: ConnectionConfig = {
  endpoint: "http://localhost:5000/api/chat",
  apiKey: "",
  model: "gpt-4",
  temperature: 0.8
};

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuid(),
      role: "system",
      content: initialSystemPrompt,
      createdAt: Date.now()
    },
    {
      id: uuid(),
      role: "assistant",
      content: initialAssistantGreeting,
      createdAt: Date.now()
    }
  ]);
  const [config, setConfig] = useState<ConnectionConfig>(defaultConfig);
  const [isPosting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formattedMessages = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content
      })),
    [messages]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = {
        id: uuid(),
        role: "user",
        content,
        createdAt: Date.now()
      };
      setMessages((previous) => [...previous, userMessage]);
      setError(null);
      setPosting(true);

      try {
        const body = JSON.stringify({
          model: config.model,
          temperature: config.temperature,
          messages: [...formattedMessages, { role: "user", content }]
        });

        const response = await fetch(config.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {})
          },
          body
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const assistantContent =
          data?.choices?.[0]?.message?.content ??
          data?.message?.content ??
          data?.reply ??
          data?.content ??
          JSON.stringify(data, null, 2);

        const assistantMessage: ChatMessage = {
          id: uuid(),
          role: "assistant",
          content: assistantContent,
          createdAt: Date.now()
        };

        setMessages((previous) => [...previous, assistantMessage]);
      } catch (fetchError) {
        const message = fetchError instanceof Error ? fetchError.message : "Unknown bridge error";
        setError(`Signal disrupted: ${message}`);
      } finally {
        setPosting(false);
      }
    },
    [config.apiKey, config.endpoint, config.model, config.temperature, formattedMessages]
  );

  return (
    <div className="relative flex flex-col gap-8">
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-lg md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-aurora-100/70">
              Numerology Guidance • Master Number 33
            </p>
            <h2 className="text-2xl font-semibold text-aurora-100 sm:text-3xl">
              Cosmic Communion Bridge
            </h2>
            <p className="text-sm text-aurora-100/70">
              Channel insights from your local AI oracle through a visually immersive interface crafted for Lifepath
              number 33—where compassion, creativity, and cosmic stewardship converge.
            </p>
          </div>
          <ConnectionSettings value={config} onChange={setConfig} />
        </div>

        <div className="mt-10 flex max-h-[60vh] flex-col gap-6 overflow-y-auto pr-2">
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/15 p-4 text-xs text-red-100">
            {error}
          </div>
        ) : null}

        <div className="mt-8">
          <MessageInput disabled={isPosting} onSend={sendMessage} />
        </div>
      </section>
    </div>
  );
}
