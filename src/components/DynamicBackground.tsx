import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const TECH_SYMBOLS = [
  "</>",
  "{ ... }",
  "<React />",
  "const",
  "useState",
  "() => {}",
  "TypeScript",
  "Tailwind",
  "Next.js",
  "CSS3",
  "HTML5",
  "UI/UX",
  "async",
  "✨",
  "✦",
];

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Particle styling
    const particleColors = isDark
      ? ["rgba(96, 165, 250, 0.7)", "rgba(167, 139, 250, 0.7)", "rgba(56, 189, 248, 0.7)", "rgba(244, 114, 182, 0.6)"]
      : ["rgba(37, 99, 235, 0.6)", "rgba(124, 58, 237, 0.6)", "rgba(2, 132, 199, 0.6)"];

    const lineColor = isDark
      ? "rgba(148, 163, 184, 0.12)"
      : "rgba(148, 163, 184, 0.15)";

    // Particles count
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    // Floating tech symbols
    const symbolCount = Math.min(Math.floor((width * height) / 45000), 18);
    const symbols: Array<{
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    for (let i = 0; i < symbolCount; i++) {
      symbols.push({
        text: TECH_SYMBOLS[i % TECH_SYMBOLS.length],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.floor(Math.random() * 6) + 12,
        color: particleColors[i % particleColors.length],
        alpha: Math.random() * 0.25 + 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update symbols
      for (let i = 0; i < symbols.length; i++) {
        const s = symbols[i];
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -60) s.x = width + 50;
        if (s.x > width + 60) s.x = -50;
        if (s.y < -30) s.y = height + 20;
        if (s.y > height + 30) s.y = -20;

        ctx.save();
        ctx.font = `600 ${s.size}px 'Fira Code', 'Consolas', monospace`;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = isDark ? s.alpha : s.alpha * 0.8;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.text, s.x, s.y);
        ctx.restore();
      }

      // 2. Draw and update particles & lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 115) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - distNodes / 115;
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
  }, [theme, mousePos.x, mousePos.y]);

  const isDark =
    theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Deep Modern Base Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-[#080b14]"
            : "bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100"
        }`}
      />

      {/* 2. Floating Animated Ambient Aurora Orbs */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-primary/20 rounded-full blur-[130px] animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] animate-float pointer-events-none" />

      {/* 3. Tech Dot Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.18]"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)"
            : "radial-gradient(rgba(15, 23, 42, 0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 4. Mouse Interactive Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDark
            ? `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 70%)`
            : `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.05), transparent 70%)`,
        }}
      />

      {/* 5. Live Canvas with Moving Tech Particles & Symbols */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default DynamicBackground;
