const STICKS_L1 = [5, 1, 10, 5, 1, 5] as const;
const STICKS_L2 = [1, 10, 5, 1, 1, 5] as const;
const STICKS_L3 = [10, 5, 1, 5, 10] as const;
const STICKS_L4 = [5, 1, 5, 10, 1, 5] as const;

function Stick({ size }: { size: number }) {
  const dots = size === 10 ? 10 : size === 5 ? 5 : 1;
  return (
    <div className={`stick s${size}`}>
      {Array.from({ length: dots }).map((_, i) => (
        <span key={i} className="dot" />
      ))}
    </div>
  );
}

export function BgLayers() {
  return (
    <>
      <div className="bg-layer bg-smoke">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>
      <div className="bg-layer bg-tenbo">
        {[STICKS_L1, STICKS_L2, STICKS_L3, STICKS_L4].map((lane, i) => (
          <div key={i} className={`lane l${i + 1}`}>
            {lane.map((s, j) => (
              <Stick key={j} size={s} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
