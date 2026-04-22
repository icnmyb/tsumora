"use client";

import { useEffect, useRef } from "react";

export function CustomScrollbar() {
  const stickRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function update() {
      const el = stickRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const viewH = window.innerHeight;
      const stickH = el.offsetHeight;
      const maxTop = viewH - stickH - 8;
      const top = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * maxTop) : 0;
      el.style.top = `${Math.max(8, top)}px`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: "10px",
        top: 0,
        height: "100%",
        width: "14px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <img
        ref={stickRef}
        src="/icon_stick_10000.svg"
        alt=""
        style={{
          width: "100%",
          position: "absolute",
          top: "8px",
          pointerEvents: "auto",
          cursor: "grab",
          filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.4))",
        borderRadius: "8px",
        }}
      />
    </div>
  );
}
