import type { CSSProperties } from "react";

/**
 * `true` bleeds to 100% of the viewport width; a number bleeds to that
 * percentage of the viewport width instead (e.g. `90` for 90vw), still
 * centered on the viewport regardless of the parent's own max-width.
 */
export type FullBleed = boolean | number;

export function fullBleedStyle(fullBleed?: FullBleed): CSSProperties | undefined {
  if (!fullBleed) return undefined;
  const vw = fullBleed === true ? 100 : fullBleed;
  return {
    position: "relative",
    left: "50%",
    width: `${vw}vw`,
    marginLeft: `${-vw / 2}vw`,
    marginRight: `${-vw / 2}vw`,
  };
}
