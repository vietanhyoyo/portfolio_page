"use client";

import { createScope, type Scope } from "animejs";
import {
  type DependencyList,
  type MutableRefObject,
  useEffect,
  useRef,
} from "react";

export type AnimeScopeSetup<T extends HTMLElement> = (
  scope: Scope,
  root: T,
) => void | (() => void);

export function useAnimeScope<T extends HTMLElement>(
  setup: AnimeScopeSetup<T>,
  dependencies: DependencyList = [],
): MutableRefObject<T | null> {
  const rootRef = useRef<T | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cleanup: void | (() => void);
    const scope = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        finePointer: "(hover: hover) and (pointer: fine)",
      },
    });
    scope.add((self) => {
      cleanup = setup(self ?? scope, root);
    });

    return () => {
      cleanup?.();
      scope.revert();
    };
    // The caller owns the dependency list, matching React's effect API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return rootRef;
}
