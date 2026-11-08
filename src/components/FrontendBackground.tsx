import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const FRONTEND_SYMBOLS = [
  "</>",
  "{ ... }",
  "<React />",
  "const",
  "<div />",
  "() => {}",
  "UI/UX",
  "CSS3",
  "HTML5",
  "useState",
  "import",
  "<span>",
  "✦",
  "flex",
  "async",
  "props",
  "<style>",
  "✨",
  "border",
  "[ ]",
  "TypeScript",
  "render()",
];

export const FrontendBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

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

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Color palettes (Girly, vibrant, attractive Purple & Pink shades)
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const darkColors = [
      "#c084fc", // Lavender Purple
      "#f472b6", // Rose Pink
      "#e879f9", // Neon Orchid / Fuchsia
      "#a78bfa", // Soft Lilac
      "#fb7185", // Coral Rose
      "#38bdf8", // Subtle Ice Blue touch
    ];

    const lightColors = [
      "#9333ea", // Vibrant Purple
      "#db2777", // Rich Rose Pink
      "#7c3aed", // Royal Violet
      "#c026d3", // Magenta Fuchsia
      "#e11d48", // Vivid Rose
      "#6366f1", // Soft Indigo
    ];

    const activeColors = isDark ? darkColors : lightColors;

    // Generate floating code elements
    // Responsive count: ~25 on mobile, ~45 on desktop
    const elementCount = Math.min(Math.floor((width * height) / 22000), 45);
    const elements: Array<{
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
      alpha: number;
      angle: number;
      vAngle: number;
    }> = [];

    for (let i = 0; i < elementCount; i++) {
      const symbol = FRONTEND_SYMBOLS[i % FRONTEND_SYMBOLS.length];
      const color = activeColors[Math.floor(Math.random() * activeColors.length)];
      const size = Math.floor(Math.random() * 8) + 14; // 14px to 22px (clear and legible)

      elements.push({
        text: symbol,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        color,
        baseAlpha: Math.random() * 0.35 + 0.45, // 0.45 to 0.8 opacity (clearly visible!)
        alpha: 0.5,
        angle: (Math.random() - 0.5) * 0.3,
        vAngle: (Math.random() - 0.5) * 0.005,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        // Move
        el.x += el.vx;
        el.y += el.vy;
        el.angle += el.vAngle;

        // Wrap around boundaries
        if (el.x < -60) el.x = width + 50;
        if (el.x > width + 60) el.x = -50;
        if (el.y < -30) el.y = height + 20;
        if (el.y > height + 30) el.y = -20;

        // Interaction with mouse (repels + brightens)
        const dx = mouse.x - el.x;
        const dy = mouse.y - el.y;
        const dist = Math.hypot(dx, dy);

        let currentScale = 1;
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          el.x -= (dx / dist) * force * 2.8;
          el.y -= (dy / dist) * force * 2.8;
          el.alpha = Math.min(1, el.baseAlpha + 0.4);
          currentScale = 1 + force * 0.25;
        } else {
          el.alpha = el.baseAlpha;
        }

        // Draw code token
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.angle);
        ctx.scale(currentScale, currentScale);

        ctx.font = `600 ${el.size}px 'Fira Code', 'Consolas', 'JetBrains Mono', monospace`;
        ctx.fillStyle = el.color;
        ctx.globalAlpha = el.alpha;

        // Glowing effect
        if (isDark) {
          ctx.shadowColor = el.color;
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowColor = "rgba(147, 51, 234, 0.2)";
          ctx.shadowBlur = 6;
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(el.text, 0, 0);

        ctx.restore();

        // Connect nearby elements with delicate shimmering pink/purple lines
        for (let j = i + 1; j < elements.length; j++) {
          const el2 = elements[j];
          const distEl = Math.hypot(el.x - el2.x, el.y - el2.y);
          if (distEl < 110) {
            ctx.save();
            ctx.strokeStyle = isDark
              ? "rgba(232, 121, 249, 0.16)"
              : "rgba(219, 39, 119, 0.14)";
            ctx.lineWidth = 1 - distEl / 110;
            ctx.beginPath();
            ctx.moveTo(el.x, el.y);
            ctx.lineTo(el2.x, el2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};

export default FrontendBackground;
