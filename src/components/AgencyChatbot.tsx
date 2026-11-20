import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Brain,
  ArrowDown,
  Maximize2,
  Minimize2,
  Copy,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { apiFetchJson } from "../lib/api";
import { isNearBottom, shouldAutoScrollOnUpdate } from "../lib/chatScroll";
import { resolveAiHelperTheme } from "../lib/aiHelperTheme";
import { parseChatBlocks, parseInlineTokens } from "../lib/chatFormatter";
import defaultChatbotAvatar from "../assets/images/ai_helper_chatbot_avatar_1795103130413.jpg";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  modelUsed?: string;
}

function FormattedInline({ text }: { text: string }) {
  const tokens = parseInlineTokens(text);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.type === "bold") {
          return (
            <strong
              key={i}
              className="font-semibold text-slate-950 dark:text-white"
            >
              {token.text}
            </strong>
          );
        }
        if (token.type === "italic") {
          return (
            <em key={i} className="italic opacity-90">
              {token.text}
            </em>
          );
        }
        if (token.type === "code") {
          return (
            <code
              key={i}
              className="font-mono text-[12.5px] px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-neutral-800 text-[#EA0400] dark:text-[#FF6B4A] font-semibold"
            >
              {token.text}
            </code>
          );
        }
        return <span key={i}>{token.text}</span>;
      })}
    </>
  );
}

function FormattedReplyView({
  text,
  accentHex,
}: {
  text: string;
  accentHex: string;
}) {
  const blocks = parseChatBlocks(text);
  if (blocks.length === 0) return null;

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          return (
            <div key={idx} className="flex items-center gap-2 pt-2 first:pt-0">
              <span
                className="h-4 w-1 rounded-full shrink-0"
                style={{ backgroundColor: accentHex }}
                aria-hidden="true"
              />
              <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-slate-950 dark:text-white tracking-tight leading-snug">
                <FormattedInline text={block.text} />
              </h4>
            </div>
          );
        }

        if (block.type === "bullet-list") {
          return (
            <ul key={idx} className="space-y-2 ps-1">
              {block.items.map((item, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-2.5 text-[14px] sm:text-[15px] leading-relaxed text-slate-800 dark:text-neutral-200"
                >
                  <span
                    className="mt-2 h-2 w-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: accentHex }}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <FormattedInline text={item} />
                  </div>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "numbered-list") {
          return (
            <ol key={idx} className="space-y-2.5 ps-1">
              {block.items.map((item, nIdx) => (
                <li
                  key={nIdx}
                  className="flex items-start gap-3 text-[14px] sm:text-[15px] leading-relaxed text-slate-800 dark:text-neutral-200"
                >
                  <span
                    className="inline-flex items-center justify-center h-5 w-5 rounded-full text-[11px] font-bold shrink-0 mt-0.5 text-white shadow-xs"
                    style={{ backgroundColor: accentHex }}
                  >
                    {item.number.replace(/[\.\)]/, "")}
                  </span>
                  <div className="flex-1">
                    <FormattedInline text={item.text} />
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "callout") {
          return (
            <div
              key={idx}
              className="border-s-3 ps-3.5 pe-3 py-2 rounded-e-xl bg-slate-50/90 dark:bg-[#1A1A20] text-slate-700 dark:text-neutral-300 text-[13.5px] sm:text-[14.5px] leading-relaxed shadow-xs"
              style={{ borderColor: accentHex }}
            >
              <FormattedInline text={block.text} />
            </div>
          );
        }

        if (block.type === "code-block") {
          return (
            <pre
              key={idx}
              className="overflow-x-auto rounded-xl bg-slate-900 text-slate-100 p-3.5 text-xs font-mono leading-relaxed shadow-xs"
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        return (
          <p
            key={idx}
            className="text-[14px] sm:text-[15px] leading-relaxed text-slate-800 dark:text-neutral-200"
          >
            <FormattedInline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

export function AgencyChatbot() {
  const { language, theme, t, chatbotOpen, openChatbot, closeChatbot } =
    useApp();

  const helperTheme = resolveAiHelperTheme(theme);

  const [deepThinking, setDeepThinking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesScrollRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pinnedRef = useRef(true);

  const copyMessage = async (text: string, index: number) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch {
      // ignore clipboard error gracefully
    }
  };

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const anchor = messagesEndRef.current;
    const container = messagesScrollRef.current;
    if (anchor && typeof anchor.scrollIntoView === "function") {
      anchor.scrollIntoView({ behavior, block: "end" });
    } else if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior });
    }
    pinnedRef.current = true;
    setPinnedToBottom(true);
  }, []);

  const handleMessagesScroll = useCallback(() => {
    const container = messagesScrollRef.current;
    if (!container) return;
    const near = isNearBottom({
      scrollTop: container.scrollTop,
      scrollHeight: container.scrollHeight,
      clientHeight: container.clientHeight,
    });
    pinnedRef.current = near;
    setPinnedToBottom(near);
  }, []);

  useEffect(() => {
    if (!chatbotOpen) return;
    const lastRole =
      messages.length > 0 ? messages[messages.length - 1].role : undefined;
    if (shouldAutoScrollOnUpdate(pinnedRef.current, lastRole)) {
      const raf = window.requestAnimationFrame(() => scrollToBottom("smooth"));
      return () => window.cancelAnimationFrame(raf);
    }
  }, [messages, loading, errorMsg, chatbotOpen, scrollToBottom]);

  useEffect(() => {
    if (!chatbotOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeChatbot();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chatbotOpen, closeChatbot]);

  const sendMessage = async (textOverride?: string) => {
    const query = (textOverride ?? input).trim();
    if (!query || loading) return;

    const priorHistory = messages.slice(-6);
    setMessages((prev) => [...prev, { role: "user" as const, text: query }]);
    if (!textOverride) setInput("");
    setErrorMsg(null);
    setLoading(true);

    try {
      const result = await apiFetchJson<{
        reply?: string;
        modelUsed?: string;
        error?: string;
      }>("/api/chat", {
        method: "POST",
        retries: 0,
        body: {
          message: query,
          history: priorHistory,
          language,
          deepThinking,
          mode: "advisor",
        },
      });

      if (!result.ok || !result.data?.reply) {
        setErrorMsg(result.error || "Unable to get an AI response right now.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: result.data!.reply!,
          modelUsed: result.data!.modelUsed,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Responsive Drawer Container sizing:
  // Mobile (< sm): fixed bottom sheet 90dvh-92dvh, rounded-t-3xl, luxurious spacious height
  // Tablet (sm & md): generous 540px-620px width, 720px height (expandable up to 780px w / 820px h)
  // Laptop/Desktop: sleek 520px-560px width, 740px height (expandable up to 720px w / 840px h)
  const drawerSizeClasses = expanded
    ? "fixed inset-x-0 bottom-0 sm:inset-x-auto sm:end-5 sm:bottom-[84px] md:end-6 w-full sm:w-[min(680px,calc(100vw-2.5rem))] md:w-[min(780px,calc(100vw-3rem))] lg:w-[720px] h-[92dvh] sm:h-[min(820px,calc(100dvh-5.5rem))] lg:h-[min(840px,calc(100vh-5.5rem))] rounded-t-3xl sm:rounded-2xl"
    : "fixed inset-x-0 bottom-0 sm:inset-x-auto sm:end-5 sm:bottom-[84px] md:end-6 w-full sm:w-[min(540px,calc(100vw-2.5rem))] md:w-[min(620px,calc(100vw-3rem))] lg:w-[520px] xl:w-[560px] h-[90dvh] sm:h-[min(720px,calc(100dvh-6.5rem))] lg:h-[min(740px,calc(100vh-6.5rem))] rounded-t-3xl sm:rounded-2xl";

  return (
    <>
      {/* Mobile backdrop scrim to focus the user and allow touch-outside to close */}
      {chatbotOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 sm:hidden transition-opacity duration-300"
          onClick={closeChatbot}
          aria-hidden="true"
        />
      )}

      {/* Theme-Synced Compact Circular Corner AI Helper Button — Always visible from start to end of site */}
      <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 flex items-center gap-2.5 pointer-events-auto">
        {!chatbotOpen && (
          <div
            data-testid="floating-ai-helper-tooltip"
            onClick={() => openChatbot()}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight shadow-lg transition-all duration-300 cursor-pointer ${helperTheme.tooltipClasses}`}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: helperTheme.accentHex }}
              aria-hidden="true"
            />
            <span>{language === "ur" ? "AI مددگار" : "AI Helper"}</span>
          </div>
        )}

        <button
          type="button"
          data-testid="floating-ai-helper-btn"
          data-theme-palette={helperTheme.paletteId}
          aria-label={chatbotOpen ? "Close AI Helper" : "AI Helper"}
          aria-expanded={chatbotOpen}
          title={language === "ur" ? "AI مددگار" : "AI Helper"}
          onClick={() => (chatbotOpen ? closeChatbot() : openChatbot())}
          style={{
            backgroundImage: helperTheme.ringGradientStyle,
            boxShadow: helperTheme.glowShadow,
          }}
          className={`peer group relative h-[56px] w-[56px] sm:h-[62px] sm:w-[62px] rounded-full p-[2.5px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 cursor-pointer shrink-0 ${helperTheme.buttonClasses}`}
        >
          <span
            className="relative block h-full w-full rounded-full overflow-hidden"
            style={{ backgroundColor: helperTheme.surfaceBg }}
          >
            {!avatarFailed ? (
              <img
                src={defaultChatbotAvatar}
                alt="AI Helper"
                referrerPolicy="no-referrer"
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover scale-[1.22] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.28]"
              />
            ) : (
              <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 text-current">
                <Sparkles
                  className="h-4 w-4"
                  style={{ color: helperTheme.accentHex }}
                  aria-hidden="true"
                />
                <span className="text-[9px] font-bold tracking-tight leading-none">
                  AI Helper
                </span>
              </span>
            )}

            {chatbotOpen && (
              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${helperTheme.closeOverlayClasses}`}
              >
                <X className="h-5 w-5" />
              </span>
            )}
          </span>

          {/* Theme-synced active indicator dot */}
          {!chatbotOpen && (
            <span
              aria-hidden="true"
              data-testid="floating-ai-helper-dot"
              className={`absolute top-0.5 end-0.5 h-3 w-3 rounded-full transition-colors duration-300 ${helperTheme.statusDotClasses}`}
            />
          )}
        </button>
      </div>

      {/* Spacious, Highly Legible AI Helper Drawer across Mobile, Tablet & Laptop */}
      {chatbotOpen && (
        <aside
          role="dialog"
          aria-label={t.chatbot.title}
          data-testid="chatbot-drawer"
          data-theme-palette={helperTheme.paletteId}
          className={`da-page-enter z-50 flex flex-col border border-slate-200/90 dark:border-neutral-800 bg-white dark:bg-[#0D0D0F] shadow-2xl overflow-hidden transition-[width,height] duration-300 ${drawerSizeClasses}`}
        >
          {/* Mobile Drag Indicator Handle */}
          <div
            className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-700 mx-auto mt-2.5 mb-0.5 shrink-0 sm:hidden"
            aria-hidden="true"
          />

          {/* Header */}
          <div className="shrink-0 px-4 sm:px-5 py-3.5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 bg-slate-50/95 dark:bg-[#111113]">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-10 w-10 shrink-0 rounded-full overflow-hidden transition-colors duration-300 ${helperTheme.headerBadgeClasses}`}
              >
                {!avatarFailed ? (
                  <img
                    src={defaultChatbotAvatar}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover scale-[1.24]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Sparkles
                      className="h-4 w-4"
                      style={{ color: helperTheme.accentHex }}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {t.chatbot.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 dark:text-neutral-400 truncate">
                  {t.chatbot.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                data-testid="chatbot-expand-toggle"
                onClick={() => setExpanded((prev) => !prev)}
                aria-label={
                  expanded
                    ? "Compact AI Helper window"
                    : "Expand AI Helper window"
                }
                title={expanded ? "Compact view" : "Expand view"}
                className="hidden sm:inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {expanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={closeChatbot}
                aria-label="Close AI Advisor"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Compact Deep Thinking Bar */}
          <div className="shrink-0 px-4 sm:px-5 py-2 border-b border-slate-100 dark:border-neutral-800/80 flex items-center justify-between text-xs bg-white/80 dark:bg-[#0F0F12]">
            <label
              htmlFor="deep-thinking-toggle"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-neutral-300 cursor-pointer select-none"
            >
              <Brain
                className="w-3.5 h-3.5 transition-colors"
                style={{ color: helperTheme.accentHex }}
              />
              <span className="font-medium">{t.chatbot.deepThinkingLabel}</span>
            </label>
            <input
              id="deep-thinking-toggle"
              type="checkbox"
              checked={deepThinking}
              onChange={(e) => setDeepThinking(e.target.checked)}
              style={{ accentColor: helperTheme.accentHex }}
              className="w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Spacious Conversation Area — independent scroll + auto-scroll-to-bottom anchor */}
          <div className="relative flex-1 min-h-0 flex flex-col">
            <div
              ref={messagesScrollRef}
              onScroll={handleMessagesScroll}
              data-testid="chatbot-messages-scroll"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-5 space-y-4 sm:space-y-5"
            >
              {messages.length === 0 && (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141417] border border-slate-200/80 dark:border-neutral-800">
                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-slate-700 dark:text-neutral-200">
                      {t.chatbot.introPrompt}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 ps-1">
                      {language === "ur"
                        ? "تجویز کردہ سوالات"
                        : "Popular questions"}
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {t.chatbot.quickPrompts.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => sendMessage(q)}
                          className={`text-start text-[13.5px] sm:text-[14px] px-4 py-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#141417] text-slate-800 dark:text-neutral-200 shadow-xs transition-all hover:translate-x-1 cursor-pointer ${helperTheme.promptHoverClasses}`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  data-testid={`chat-msg-${msg.role}`}
                  className={`transition-all ${
                    msg.role === "user"
                      ? "ms-auto max-w-[85%] rounded-2xl rounded-br-xs px-4 sm:px-5 py-3 text-[14px] sm:text-[15px] leading-relaxed bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium shadow-xs"
                      : "w-full rounded-2xl rounded-tl-xs p-4 sm:p-5 sm:px-6 bg-slate-50/95 dark:bg-[#141418] text-slate-900 dark:text-neutral-100 border border-slate-200/90 dark:border-neutral-800/90 shadow-sm"
                  }`}
                >
                  {msg.role === "model" ? (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/70 dark:border-neutral-800 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200 dark:border-neutral-700 shrink-0">
                            <img
                              src={defaultChatbotAvatar}
                              alt=""
                              className="h-full w-full object-cover scale-110"
                            />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {language === "ur"
                              ? "ڈیجیٹل آغاز AI مشیر"
                              : "Digital Aghaz AI Advisor"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyMessage(msg.text, i)}
                          title={copiedIndex === i ? "Copied!" : "Copy answer"}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          {copiedIndex === i ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <FormattedReplyView
                        text={msg.text}
                        accentHex={helperTheme.accentHex}
                      />
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}

              {loading && (
                <div className="inline-flex items-center gap-2.5 text-xs text-slate-500 dark:text-neutral-400 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141417] border border-slate-200/80 dark:border-neutral-800">
                  <span
                    className="h-2.5 w-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: helperTheme.accentHex }}
                  />
                  <span>{t.chatbot.thinkingStatus}</span>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl border border-[#EA0400]/50 bg-[#EA0400]/10 text-xs text-slate-900 dark:text-white font-medium"
                >
                  {errorMsg}
                </div>
              )}

              {/* Auto-scroll to bottom anchor */}
              <div
                ref={messagesEndRef}
                data-testid="chatbot-bottom-anchor"
                className="h-px w-full shrink-0"
                aria-hidden="true"
              />
            </div>

            {/* Jump to latest button appears only when scrolled up in long history */}
            {!pinnedToBottom && messages.length > 0 && (
              <button
                type="button"
                data-testid="chatbot-jump-bottom"
                onClick={() => scrollToBottom("smooth")}
                aria-label={
                  language === "ur"
                    ? "تازہ ترین پیغام پر جائیں"
                    : "Scroll to latest message"
                }
                className={`absolute bottom-3 end-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-neutral-700 bg-white/95 dark:bg-[#18181B]/95 px-3.5 py-1.5 text-xs font-medium text-slate-800 dark:text-neutral-100 shadow-lg transition-colors cursor-pointer ${helperTheme.promptHoverClasses}`}
              >
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{language === "ur" ? "تازہ پیغام" : "Latest"}</span>
              </button>
            )}
          </div>

          {/* Pinned Follow-up Question Strip — always visible & easy to tap */}
          {messages.length > 0 && (
            <div
              data-testid="chatbot-followup-strip"
              className="shrink-0 px-4 sm:px-6 pt-2.5 pb-2 border-t border-slate-100 dark:border-neutral-800/80 bg-slate-50/95 dark:bg-[#111114]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1.5">
                {language === "ur"
                  ? "فوری اگلا سوال پوچھیں"
                  : "Ask another question"}
              </p>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {t.chatbot.quickPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={loading}
                    onClick={() => sendMessage(q)}
                    className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-neutral-700 bg-white dark:bg-[#18181C] text-slate-700 dark:text-neutral-200 transition-colors cursor-pointer disabled:opacity-50 ${helperTheme.promptHoverClasses}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pinned Composer Bar — always anchored cleanly at bottom with comfortable tap targets */}
          <form
            data-testid="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="shrink-0 p-3 sm:p-4 border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0F] flex items-center gap-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              aria-label={t.chatbot.placeholder}
              className="flex-1 min-h-[44px] rounded-xl border border-slate-300 dark:border-neutral-700 bg-slate-50/70 dark:bg-[#141417] px-4 py-2.5 text-[14px] sm:text-[14.5px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:border-[#2563EB] dark:focus:border-[#EA0400] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.chatbot.send}
              className={`min-h-[44px] min-w-[44px] px-4 rounded-xl flex items-center justify-center disabled:opacity-45 transition-colors cursor-pointer shrink-0 ${helperTheme.sendBtnClasses}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
