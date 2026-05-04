"use client";

import { useEffect, useState } from "react";

interface InlineSvgProps {
  /** Path to SVG under /public, e.g. "/svg/ox.svg" */
  src: string;
  className?: string;
}

// Module-level cache so the same SVG isn't fetched per-tile.
const cache = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

async function fetchSvg(src: string): Promise<string> {
  const cached = cache.get(src);
  if (cached) return cached;

  const pending = inflight.get(src);
  if (pending) return pending;

  const promise = fetch(src)
    .then((r) => (r.ok ? r.text() : ""))
    .then((text) => {
      cache.set(src, text);
      inflight.delete(src);
      return text;
    })
    .catch(() => {
      inflight.delete(src);
      return "";
    });

  inflight.set(src, promise);
  return promise;
}

/**
 * Inlines an SVG file so its `stroke="currentColor"` / `fill="currentColor"`
 * inherit from the parent's `color`, and so the parent's `opacity` applies
 * to the mark. Avoids the <img> tag's CSS-isolation limits.
 */
export default function InlineSvg({ src, className }: InlineSvgProps) {
  const [markup, setMarkup] = useState<string>(() => cache.get(src) ?? "");

  useEffect(() => {
    if (cache.has(src)) {
      setMarkup(cache.get(src)!);
      return;
    }
    let alive = true;
    fetchSvg(src).then((text) => {
      if (alive) setMarkup(text);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  if (!markup) {
    return <div className={className} aria-hidden />;
  }

  // The inlined SVG might not have width/height attributes that match the
  // container. We wrap in a div that makes the child <svg> fill the box.
  return (
    <div
      aria-hidden
      className={className}
      style={{ display: "block" }}
      // SVG content is a static asset we control; safe to inline.
      dangerouslySetInnerHTML={{
        __html: markup.replace(
          /<svg([^>]*)>/,
          '<svg$1 style="width:100%;height:100%;display:block">',
        ),
      }}
    />
  );
}