import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
function CardSkeleton({ cards, css }) {
  return Array(cards)
    .fill(0)
    .map((_a, i) => (
      <Skeleton
        key={i}
        className={`
     ${css}`}
      ></Skeleton>
    ));
}
export default memo(CardSkeleton);
