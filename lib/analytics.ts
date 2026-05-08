export type PlausibleEventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: PlausibleEventProps }) => void;
  }
}

export function trackEvent(eventName: string, props?: PlausibleEventProps) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;

  const safeProps = props
    ? Object.fromEntries(
        Object.entries(props).filter(([, value]) => value !== undefined && value !== null),
      )
    : undefined;

  window.plausible(eventName, safeProps ? { props: safeProps } : undefined);
}
