import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export const ClassicBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Subtle, calm classic particles
    const particleColor = isDark
      ? "rgba(226, 232, 240, 0.35)" // Soft slate white
      : "rgba(71, 85, 105, 0.25)"; // Soft charcoal slate
    const lineColor = isDark
      ? "rgba(148, 163, 184, 0.08)"
      : "rgba(148, 163, 184, 0.1)";

    const count = Math.min(Math.floor((width * height) / 26000), 35);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.8,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / 130;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const isDark =
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Classic Architectural Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px)"
            : "radial-gradient(rgba(15, 23, 42, 0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Interactive Mouse Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 70%)`
            : `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(15, 23, 42, 0.05), transparent 70%)`,
        }}
      />

      {/* Subtle Floating Hairline Constellations */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default ClassicBackground;
