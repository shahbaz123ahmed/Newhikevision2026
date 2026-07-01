"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Newsletter error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-3 px-6 py-4 bg-[#34C759]/10 border border-[#34C759]/30 rounded-2xl text-[#34C759] font-black text-sm uppercase tracking-widest animate-fade-in">
        <CheckCircle2 size={20} />
        You&apos;re subscribed! Welcome aboard.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/10 transition-all font-medium shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#C41E3A] hover:bg-[#A01830] text-white font-black text-sm uppercase tracking-widest transition-all disabled:opacity-60 shadow-md shadow-[#C41E3A]/20 active:scale-95"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <Send size={16} />
            <span className="hidden sm:inline">Subscribe</span>
          </>
        )}
      </button>
    </form>
  );
}
