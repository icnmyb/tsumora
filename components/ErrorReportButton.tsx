"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type SubmitState = "idle" | "sending" | "sent" | "error";

const CATEGORY_OPTIONS = [
  "選手情報",
  "成績・順位",
  "タイトル戦",
  "対局予定",
  "リンク切れ",
  "その他",
];

export function ErrorReportButton() {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [contact, setContact] = useState("");
  const [trap, setTrap] = useState("");

  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return pathname;
    return window.location.href;
  }, [pathname, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    setState("sending");
    trackEvent("Error Report Submit", { category, path: pathname });

    try {
      const response = await fetch("/api/report-error", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category,
          message,
          contact,
          pageUrl,
          trap,
        }),
      });

      if (!response.ok) throw new Error("Report submission failed");

      setState("sent");
      setMessage("");
      setContact("");
      setTrap("");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className="error-report-fab"
        aria-expanded={isOpen}
        aria-controls="error-report-panel"
        onClick={() => {
          setIsOpen((value) => !value);
          setState("idle");
          trackEvent("Error Report Open", { path: pathname });
        }}
      >
        <span aria-hidden="true">!</span>
        <span>誤りを報告</span>
      </button>

      {isOpen ? (
        <div className="error-report-layer" role="presentation">
          <button
            type="button"
            className="error-report-backdrop"
            aria-label="報告フォームを閉じる"
            onClick={() => setIsOpen(false)}
          />
          <section
            id="error-report-panel"
            className="error-report-panel"
            aria-labelledby="error-report-title"
          >
            <div className="error-report-head">
              <div>
                <p>DATA CORRECTION</p>
                <h2 id="error-report-title">情報の誤りを報告</h2>
              </div>
              <button type="button" aria-label="閉じる" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                種別
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                内容
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  minLength={8}
                  maxLength={1000}
                  required
                  placeholder="例: ○○選手の所属団体が違う / タイトル獲得年が異なる など"
                />
              </label>

              <label>
                連絡先任意
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  maxLength={120}
                  placeholder="Xアカウント、メールなど"
                />
              </label>

              <label className="error-report-trap" aria-hidden="true">
                会社名
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(event) => setTrap(event.target.value)}
                />
              </label>

              <div className="error-report-page" title={pageUrl}>
                {pageUrl}
              </div>

              <button type="submit" disabled={state === "sending" || message.trim().length < 8}>
                {state === "sending" ? "送信中..." : "送信"}
              </button>

              {state === "sent" ? (
                <p className="error-report-status" role="status">
                  ありがとうございます。確認リストに追加しました。
                </p>
              ) : null}
              {state === "error" ? (
                <p className="error-report-status error" role="alert">
                  送信できませんでした。少し時間をおいて再度お試しください。
                </p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
