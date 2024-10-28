"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
const Scene = dynamic(() => import("~/three/components/canvas/scene"), {
  ssr: false,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ref as React.LegacyRef<HTMLDivElement>}
        style={{
          position: "relative",
          width: " 100%",
          height: "100%",
          overflow: "auto",
          touchAction: "auto",
        }}
      >
        <Scene
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          eventSource={ref}
          eventPrefix="client"
        />
        {children}
      </div>
    </>
  );
};

export { Layout };
