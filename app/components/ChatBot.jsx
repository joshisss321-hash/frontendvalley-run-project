"use client";

import { useState, useRef, useEffect } from "react";
import { getUserToken } from "../../lib/userApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* Pehli baar khulne par yehi dikhta hai — logon ko shuru karna aasan ho */
const SUGGESTIONS = [
  "How do I submit my activity?",
  "When will my medal arrive?",
  "Which events are open right now?",
  "How much discount do referrals give?",
];

const GREETING =
  "Hi! 👋 I'm the Valley Run assistant.\n\n" +
  "Ask me anything about registration, activity submission, medal tracking or the leaderboard. " +
  "If you're logged in, I can look up your own details too.";

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput]     = useState("");
  const [busy, setBusy]       = useState(false);
  const [unseen, setUnseen]   = useState(false);

  const endRef   = useRef(null);
  const inputRef = useRef(null);

  /* Naya message aate hi neeche scroll */
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open, busy]);

  useEffect(() => {
    if (open) {
      setUnseen(false);
      inputRef.current?.focus();
    }
  }, [open]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || busy) return;

    const next = [...msgs, { role: "user", content: question }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const token = getUserToken();

      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Greeting server ko bhejne ki zaroorat nahi
        body: JSON.stringify({ messages: next.slice(1) }),
      });

      const data = await res.json().catch(() => ({}));

      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ||
            "Something went wrong. Please try again in a moment, or message us on WhatsApp at 8171794766.",
        },
      ]);

      if (!open) setUnseen(true);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Couldn't connect. Please check your internet, or message us on WhatsApp at 8171794766.",
        },
      ]);
    }

    setBusy(false);
  };

  return (
    <>
      {/* ── Floating button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Valley Run"
          className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition flex items-center justify-center text-2xl"
        >
          💬
          {unseen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
          )}
        </button>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-[60] sm:w-[380px] sm:h-[560px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="min-w-0">
              <p className="font-bold leading-tight">Valley Run Assistant</p>
              <p className="text-[11px] text-white/70">Usually replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white text-2xl leading-none px-2"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-red-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions — sirf shuru mein */}
            {msgs.length === 1 && !busy && (
              <div className="space-y-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-sm bg-white border border-gray-200 hover:border-red-400 hover:bg-red-50/40 rounded-xl px-4 py-2.5 transition text-gray-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="Type your question..."
                disabled={busy}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
              />
              <button
                onClick={() => send()}
                disabled={busy || !input.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold px-4 rounded-xl transition"
              >
                ➤
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-2">
              For refund or payment issues, please contact us directly on 8171794766
            </p>
          </div>
        </div>
      )}
    </>
  );
}
