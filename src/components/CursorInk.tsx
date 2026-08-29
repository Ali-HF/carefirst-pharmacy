"use client";

import { useEffect, useRef } from "react";

export default function CursorInk() {
  const rafId = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    const splatters: HTMLElement[] = [];

    const onClick = (e: MouseEvent) => spawnSplatter(e.clientX, e.clientY, splatters);
    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
      splatters.forEach((el) => el.remove());
    };
  }, []);

  return null;
}

// ─── Click pulse & medical crosses ───────────────────────────────────────────────────────────

function spawnSplatter(cx: number, cy: number, registry: HTMLElement[]) {
  // 1. Center Pulse
  const pulse = document.createElement("div");
  Object.assign(pulse.style, {
    position: "fixed",
    left: cx + "px",
    top: cy + "px",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "2px solid rgba(249, 115, 22, 0.6)",
    background: "rgba(249, 115, 22, 0.15)",
    pointerEvents: "none",
    zIndex: "10000",
    transform: "translate(-50%,-50%) scale(0)",
  });
  document.body.appendChild(pulse);
  registry.push(pulse);
  pulse.animate(
    [
      { transform: "translate(-50%,-50%) scale(0.5)", opacity: "1" },
      { transform: "translate(-50%,-50%) scale(2.5)", opacity: "0" },
    ],
    { duration: 500, easing: "ease-out", fill: "forwards" }
  ).onfinish = () => {
    pulse.remove();
    const i = registry.indexOf(pulse);
    if (i !== -1) registry.splice(i, 1);
  };

  // 2. Floating Medical Crosses (+)
  const count = 3 + Math.floor(Math.random() * 2);
  for (let d = 0; d < count; d++) {
    const angle = (Math.PI * 2 * d) / count + (Math.random() - 0.5);
    const dist = 15 + Math.random() * 20;
    const dur = 400 + Math.random() * 200;
    const ex = Math.cos(angle) * dist;
    const ey = Math.sin(angle) * dist - (10 + Math.random() * 15); // Float upwards
    const rot = (Math.random() - 0.5) * 90;
    const size = 12 + Math.random() * 6;

    const cross = document.createElement("div");
    cross.textContent = "+";
    Object.assign(cross.style, {
      position: "fixed",
      left: cx + "px",
      top: cy + "px",
      fontSize: size + "px",
      fontWeight: "bold",
      color: "rgba(249, 115, 22, 0.8)",
      pointerEvents: "none",
      zIndex: "10000",
      transform: `translate(-50%,-50%) rotate(${rot}deg)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
    document.body.appendChild(cross);
    registry.push(cross);
    cross.animate(
      [
        { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(0.5)`, opacity: "1" },
        {
          transform: `translate(calc(-50% + ${ex}px), calc(-50% + ${ey}px)) rotate(${rot}deg) scale(1.2)`,
          opacity: "0",
        },
      ],
      { duration: dur, easing: "cubic-bezier(.25,.46,.45,.94)", fill: "forwards" }
    ).onfinish = () => {
      cross.remove();
      const i = registry.indexOf(cross);
      if (i !== -1) registry.splice(i, 1);
    };
  }
}
