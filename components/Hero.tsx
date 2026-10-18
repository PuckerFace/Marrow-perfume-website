'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Btn from './Btn';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export const goTo = (sel: string) =>
  gsap.to(window, {
    scrollTo: { y: sel },
    duration: 2.4,
    ease: 'power3.inOut',
  });
const wave = 'M0 0 ' + 'q125 -26 250 0 q125 26 250 0 '.repeat(8) + 'V500 H0Z';
const T: any = {
  x: 0,
  y: 322,
  fontSize: 335,
  textLength: 1000,
  lengthAdjust: 'spacingAndGlyphs',
  fontFamily: 'var(--font-display)',
};
export default function Hero() {
  const root = useRef<HTMLElement>(null),
    liq = useRef<SVGGElement>(null);
  useLayoutEffect(() => {
    const c = gsap.context(() => {
      gsap.set(liq.current, { y: 350 });
      gsap.to('.wave', { x: -500, duration: 4, repeat: -1, ease: 'none' });
      gsap.to('.wave2', { x: -500, duration: 6.5, repeat: -1, ease: 'none' });
      //   gsap.from('.h-in', {
      //     opacity: 0,
      //     y: 40,
      //     duration: 1.6,
      //     stagger: 0.2,
      //     ease: 'power4.out',
      //     delay: 0.3,
      //   });
      const intro = gsap.from('.h-in', {
        opacity: 0,
        y: 40,
        duration: 1.6,
        stagger: 0.2,
        ease: 'power4.out',
        paused: !(window as any).__loaderDone,
      });
      window.addEventListener('loader:done', () => intro.play(), {
        once: true,
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
          },
        })
        .to(liq.current, { y: -50, ease: 'none', duration: 1 }, 0)
        .to('.h-outline', { strokeOpacity: 1, ease: 'none', duration: 1 }, 0)
        .to('.h-fade', { opacity: 0, duration: 0.15 }, 0)
        .to('.h-end', { opacity: 1, y: 0, duration: 0.2 }, 0.85);
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }, root);
    return () => c.revert();
  }, []);
  return (
    <section
      ref={root}
      className="relative flex h-screen flex-col justify-center overflow-hidden"
    >
      <p className="h-in h-fade absolute left-5 top-28 max-w-[16rem] font-serif italic text-bone/70 md:left-10">
        A fragrance for people who find perfume offensive.
      </p>
      <svg
        viewBox="0 0 1000 340"
        className="h-in w-full select-none"
        role="img"
        aria-label="Marrow"
      >
        <defs>
          <clipPath id="m">
            <text {...T}>MARROW</text>
          </clipPath>
        </defs>
        <text {...T} fill="#d8cfbd">
          MARROW
        </text>
        <g clipPath="url(#m)">
          <g ref={liq}>
            <g className="wave2">
              <path d={wave} fill="#1a0505" transform="translate(-170 -16)" />
            </g>
            <g className="wave">
              <path d={wave} fill="#000" />
            </g>
          </g>
        </g>
        <text
          {...T}
          className="h-outline"
          fill="none"
          stroke="#d8cfbd"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeOpacity=".3"
        >
          MARROW
        </text>
      </svg>
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-5 px-5 md:flex-row md:justify-between md:px-10">
        <p className="h-in h-fade font-serif italic text-bone/70">
          Scroll. Let it fill.
        </p>
        <div className="h-end translate-y-6 opacity-0">
          <Btn onClick={() => goTo('#products')}>Experience the Scent</Btn>
        </div>
      </div>
    </section>
  );
}
