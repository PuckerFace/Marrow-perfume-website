'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Cursor() {
  const cv = useRef<HTMLCanvasElement>(null),
    dot = useRef<HTMLDivElement>(null),
    ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = cv.current!,
      g = c.getContext('2d')!;
    let w = 0,
      h = 0;
    const fit = () => {
      const d = devicePixelRatio || 1;
      w = innerWidth;
      h = innerHeight;
      c.width = w * d;
      c.height = h * d;
      g.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    addEventListener('resize', fit);
    const ps: any[] = [];
    let mx = 0,
      my = 0,
      lx = 0,
      ly = 0,
      live = false,
      rx = 0,
      ry = 0;
    const R = Math.random;
    const mv = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mx = e.clientX;
      my = e.clientY;
      if (!live) {
        live = true;
        lx = rx = mx;
        ly = ry = my;
        document.documentElement.classList.add('has-cursor');
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 });
      }
    };
    const ov = (e: Event) => {
      const t = e.target as Element;
      const on = t && t.closest && t.closest('a,button,input');
      gsap.to(ring.current, { '--s': on ? 2.4 : 1, duration: 0.4 });
    };
    addEventListener('pointermove', mv);
    addEventListener('pointerover', ov);
    const tick = () => {
      if (!live) return;
      const d = Math.hypot(mx - lx, my - ly);
      const n = d > 0.5 ? Math.min(8, Math.ceil(d / 5)) : 0;
      for (let i = 0; i < n; i++) {
        const t = (i + 1) / n;
        ps.push({
          x: lx + (mx - lx) * t,
          y: ly + (my - ly) * t,
          vx: (R() - 0.5) * 0.6,
          vy: -0.25 - R() * 0.6,
          r: 8 + R() * 12,
          l: 1,
        });
      }
      lx = mx;
      ly = my;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      g.clearRect(0, 0, w, h);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.l -= 0.011;
        if (p.l <= 0) {
          ps.splice(i, 1);
          continue;
        }
        p.x += p.vx + Math.sin(p.l * 9 + i) * 0.25;
        p.y += p.vy;
        p.r += 0.4;
        const gr = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gr.addColorStop(0, `rgba(216,207,189,${p.l * 0.14})`);
        gr.addColorStop(1, 'rgba(216,207,189,0)');
        g.fillStyle = gr;
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, 7);
        g.fill();
      }
      dot.current!.style.transform = `translate(${mx}px,${my}px)`;
      ring.current!.style.transform = `translate(${rx}px,${ry}px) scale(var(--s,1))`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      removeEventListener('pointermove', mv);
      removeEventListener('pointerover', ov);
      removeEventListener('resize', fit);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <canvas ref={cv} className="absolute inset-0 h-full w-full" />
      <div
        ref={dot}
        style={{ opacity: 0 }}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-bone"
      />
      <div
        ref={ring}
        style={{ opacity: 0 }}
        className="absolute left-0 top-0 -ml-5 -mt-5 h-10 w-10 rounded-full border border-bone/50"
      />
    </div>
  );
}
