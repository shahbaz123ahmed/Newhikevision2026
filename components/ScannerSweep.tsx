"use client";

import { useEffect, useRef } from "react";

export default function ScannerSweep() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const CYCLE_MS = 2000; // 2 seconds per sweep

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % CYCLE_MS;
      const progress = elapsed / CYCLE_MS; // 0 → 1

      // Scanner moves from right edge (100vw) to left edge (-300px)
      const startX = window.innerWidth + 50;
      const endX = -350;
      const currentX = lerp(startX, endX, progress);

      if (scannerRef.current) {
        scannerRef.current.style.left = `${currentX}px`;
      }

      // Find all glowable elements and check if scanner overlaps them
      const glowTargets = document.querySelectorAll<HTMLElement>("[data-glow-target]");
      const scannerWidth = 280;
      const scannerLeft = currentX;
      const scannerRight = currentX + scannerWidth;

      glowTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elLeft = rect.left;
        const elRight = rect.right;
        const elCenterX = rect.left + rect.width / 2;

        // Check horizontal overlap
        const overlaps = scannerLeft < elRight && scannerRight > elLeft;

        // How close is scanner center to element center (0-1)
        const scannerCenterX = currentX + scannerWidth / 2;
        const dist = Math.abs(scannerCenterX - elCenterX);
        const maxDist = (rect.width / 2) + scannerWidth / 2;
        const intensity = overlaps ? Math.max(0, 1 - dist / maxDist) : 0;

        if (overlaps && intensity > 0.05) {
          el.style.textShadow = `0 0 ${8 * intensity}px rgba(196,30,58,${0.9 * intensity}), 0 0 ${20 * intensity}px rgba(212,168,67,${0.5 * intensity})`;
          el.style.color = `rgba(${lerp(255, 196, intensity)}, ${lerp(255, 30, intensity)}, ${lerp(255, 58, intensity)}, 1)`;
          el.style.transition = "none";
        } else {
          // Restore original color smoothly
          el.style.textShadow = "";
          el.style.color = "";
          el.style.transition = "color 0.4s ease, text-shadow 0.4s ease";
        }
      });

      // Glow box targets (cards, stat boxes)
      const boxTargets = document.querySelectorAll<HTMLElement>("[data-glow-box]");
      boxTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elLeft = rect.left;
        const elRight = rect.right;
        const elCenterX = rect.left + rect.width / 2;

        const overlaps = (currentX) < elRight && (currentX + scannerWidth) > elLeft;
        const scannerCenterX = currentX + scannerWidth / 2;
        const dist = Math.abs(scannerCenterX - elCenterX);
        const maxDist = (rect.width / 2) + scannerWidth / 2;
        const intensity = overlaps ? Math.max(0, 1 - dist / maxDist) : 0;

        if (overlaps && intensity > 0.1) {
          el.style.boxShadow = `0 0 ${20 * intensity}px rgba(196,30,58,${0.5 * intensity}), 0 0 ${40 * intensity}px rgba(212,168,67,${0.2 * intensity})`;
          el.style.borderColor = `rgba(196,30,58,${0.7 * intensity})`;
          el.style.transition = "none";
        } else {
          el.style.boxShadow = "";
          el.style.borderColor = "";
          el.style.transition = "box-shadow 0.5s ease, border-color 0.5s ease";
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={scannerRef}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: "280px",
        pointerEvents: "none",
        zIndex: 9998,
        background:
          "linear-gradient(to right, transparent 0%, rgba(196,30,58,0.12) 30%, rgba(212,168,67,0.18) 50%, rgba(196,30,58,0.12) 70%, transparent 100%)",
        filter: "blur(4px)",
        transform: "skewX(-8deg)",
        willChange: "left",
      }}
    />
  );
}
