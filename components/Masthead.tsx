import Link from "next/link";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <div className="masthead-left">
          <div className="edition">
            <b>Vol.142</b>
            2026.04.21
            <br />
            TUESDAY
          </div>
          <h1>
            <Link href="/">
              Hora<span className="dot">.mg</span>
            </Link>
            <span className="en">The Pro Mahjong Review</span>
          </h1>
        </div>
        <div className="masthead-right">
          <div className="kv">
            <span>IN PROGRESS</span>
            <b className="mono">02 LIVE</b>
          </div>
          <div className="kv">
            <span>TODAY</span>
            <b className="mono">07 MATCHES</b>
          </div>
          <div className="big mono">
            19:32
            <span
              style={{
                fontFamily: "'Geist Mono'",
                fontSize: 11,
                color: "var(--ink-3)",
                marginLeft: 4,
                fontWeight: 500,
              }}
            >
              JST
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
