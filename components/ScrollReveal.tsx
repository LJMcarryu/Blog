"use client";

import React, { Children, cloneElement, isValidElement } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger,
  threshold,
  rootMargin,
}: ScrollRevealProps) {
  const { ref } = useScrollReveal({ threshold, rootMargin });

  const isStagger = typeof stagger === "number";
  const baseClass = isStagger ? "scroll-stagger scroll-reveal-target" : "scroll-reveal-target";

  const style: React.CSSProperties = {
    ...(delay > 0 ? { "--scroll-delay": `${delay}ms` } as React.CSSProperties : {}),
    ...(isStagger ? { "--stagger-step": `${stagger}ms` } as React.CSSProperties : {}),
  };

  const wrappedChildren = isStagger
    ? Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              ...(child.props as { style?: React.CSSProperties }).style,
              "--scroll-stagger-index": index,
            } as React.CSSProperties,
          });
        }
        return child;
      })
    : children;

  return (
    // @ts-expect-error -- dynamic tag element
    <Tag ref={ref} className={`${baseClass} ${className}`.trim()} style={style}>
      {wrappedChildren}
    </Tag>
  );
}
