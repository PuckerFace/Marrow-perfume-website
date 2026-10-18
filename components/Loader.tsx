'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const wave = 'M0 0 ' + 'q125 -26 250 0 q125 26 250 0 '.repeat(8) + 'V500 H0Z';
const T: any = {
  x: 0,
  y: 322,
  fontSize: 335,
  textLength: 1000,
  lengthAdjust: 'spacingAndGlyphs',
  fontFamily: 'var(--font-display)',
};

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const liq = useRef<SVGGElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const p = { v: 0 };
    const render = () => {
      gsap.set(liq.current, { y: 350 - p.v * 3.9 }); // 350 -> -40
      if (num.current)
        num.current.textContent = String(Math.round(p.v)).padStart(3, '0');
    };
    const to = (v: number, duration: number, ease: string) =>
      new Promise<void>((res) =>
        gsap.to(p, {
          v,
          duration,
          ease,
          onUpdate: render,
          onComplete: () => res(),
        }),
      );

    const assets = Promise.all([
      document.fonts.ready,
      new Promise((r) => {
        const i = new Image();
        i.onload = i.onerror = () => r(0);
        i.src = '/marrow-bottle.png';
      }),
      new Promise((r) =>
        document.readyState === 'complete'
          ? r(0)
          : window.addEventListener('load', () => r(0), { once: true }),
      ),
    ]);

    const ctx = gsap.context(() => {
      gsap.to('.ld-wave', { x: -500, duration: 3, repeat: -1, ease: 'none' });
      gsap.to('.ld-wave2', { x: -500, duration: 5, repeat: -1, ease: 'none' });
      gsap.from('.ld-in', {
        opacity: 0,
        y: 24,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });
      render();

      (async () => {
        await to(85, 2.2, 'power2.out'); // minimum show time
        await assets; // never finish before real assets
        await to(100, 0.7, 'power2.inOut');
        await new Promise((r) => setTimeout(r, 250));

        const out = gsap.timeline({
          onComplete: () => {
            body.style.overflow = '';
            root.current?.remove();
            ScrollTrigger.refresh();
            (window as any).__loaderDone = true;
            window.dispatchEvent(new Event('loader:done'));
          },
        });
        out
          .to('.ld-content', {
            opacity: 0,
            y: -40,
            duration: 0.6,
            ease: 'power3.in',
          })
          .to(
            root.current,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.2,
              ease: 'expo.inOut',
            },
            '-=0.1',
          );
      })();
    }, root);

    return () => {
      ctx.revert();
      body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] bg-black"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-label="Loading"
    >
      <div className="ld-content absolute inset-0 flex flex-col justify-between px-5 py-6 md:px-10 md:py-8">
        <div className="ld-in flex items-start justify-between">
          <span className="font-display text-lg tracking-[.12em]">
            SILLAGE &amp; BONE
          </span>
          <span className="font-serif italic text-bone/60">
            Opening the vessel
          </span>
        </div>

        <svg
          viewBox="0 0 1000 340"
          className="ld-in w-full select-none"
          aria-hidden
        >
          <defs>
            <clipPath id="ld-m">
              <text {...T}>MARROW</text>
            </clipPath>
          </defs>
          <g clipPath="url(#ld-m)">
            <g ref={liq}>
              <g className="ld-wave2">
                <path d={wave} fill="#5a1414" transform="translate(-170 -16)" />
              </g>
              <g className="ld-wave">
                <path d={wave} fill="#d8cfbd" />
              </g>
            </g>
          </g>
          <text
            {...T}
            fill="none"
            stroke="#d8cfbd"
            strokeWidth="2"
            strokeOpacity=".45"
            strokeLinejoin="round"
          >
            MARROW
          </text>
        </svg>

        <div className="ld-in flex items-end justify-between">
          <span
            ref={num}
            className="font-display text-[22vw] leading-[.8] md:text-[12vw]"
          >
            000
          </span>
          <span className="pb-2 font-display text-sm uppercase tracking-[.18em] text-bone/60">
            Iron · Cedar · Ash
          </span>
        </div>
      </div>
    </div>
  );
}
