"use client";

import { OrbitControls, View as ViewImpl } from "@react-three/drei";
import {
  forwardRef,
  type MutableRefObject,
  useImperativeHandle,
  useRef,
} from "react";
import { Three } from "~/three/helpers/three";

type ViewProps = {
  children: React.ReactNode;
  orbit?: boolean;
  className?: string;
};

const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
  const localRef = useRef<never>(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef as unknown as MutableRefObject<HTMLElement>}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  );
});

View.displayName = "View";

export { View };
