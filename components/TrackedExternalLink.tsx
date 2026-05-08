"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type PlausibleEventProps } from "@/lib/analytics";

type TrackedExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventProps?: PlausibleEventProps;
  children?: ReactNode;
};

export function TrackedExternalLink({
  eventName,
  eventProps,
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  children,
  ...props
}: TrackedExternalLinkProps) {
  return (
    <a
      {...props}
      target={target}
      rel={rel}
      onClick={(event) => {
        trackEvent(eventName, eventProps);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
