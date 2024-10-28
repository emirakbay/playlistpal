"use client";

import { r3f } from "~/three/helpers/global";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Three = ({ children }: any) => {
  return <r3f.In>{children}</r3f.In>;
};
