"use client";

import { useState } from "react";

export function useScroll() {
  const [isScrolling, setIsScrolling] = useState(false);

  return {
    isScrolling,
    setIsScrolling,
  };
}
