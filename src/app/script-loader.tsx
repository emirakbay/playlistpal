"use client";

import Script from "next/script";

export default function ScriptLoader() {
  return <Script src="https://genius.codes" strategy="afterInteractive" />;
}
