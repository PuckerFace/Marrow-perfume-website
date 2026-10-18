'use client';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

const V: any = {
  solid: ['bg-bone border-bone', 'bg-ember', '#000', '#d8cfbd'],
  ghost: ['bg-transparent border-bone', 'bg-bone', '#d8cfbd', '#000'],
  dark: ['bg-black border-black', 'bg-ember', '#d8cfbd', '#d8cfbd'],
};

export default function Btn({
  children,
  onClick,
  variant = 'solid',
  type = 'button',
  className = '',
}: any) {
  const b = useRef<HTMLButtonElement>(null);
  const f = useRef<HTMLSpanElement>(null); // fill
  const l1 = useRef<HTMLSpanElement>(null); // resting label
  const l2 = useRef<HTMLSpanElement>(null); // hover label
  const tl = useRef<gsap.core.Timeline>();
  const [base, fill, t0, t1] = V[variant];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(l2.current, { yPercent: 100 });
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.5, ease: 'power3.inOut' },
        })
        .to(f.current, { yPercent: -100 }, 0)
        .to(l1.current, { yPercent: -100 }, 0)
        .to(l2.current, { yPercent: 0 }, 0);
    }, b);
    return () => ctx.revert();
  }, []);

  const over = () => tl.current?.play();
  const out = () => tl.current?.reverse();

  return (
    <button
      ref={b}
      type={type}
      onClick={onClick}
      onPointerEnter={over}
      onPointerLeave={out}
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && over()}
      onBlur={out}
      onPointerDown={() =>
        gsap.to(b.current, { scale: 0.96, duration: 0.15, overwrite: 'auto' })
      }
      onPointerUp={() =>
        gsap.to(b.current, {
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1,.5)',
          overwrite: 'auto',
        })
      }
      className={`relative overflow-hidden border px-8 py-4 font-display text-sm uppercase tracking-[.18em] ${base} ${className}`}
    >
      <span
        ref={f}
        className={`absolute inset-x-0 top-full h-full will-change-transform ${fill}`}
      />
      <span className="relative z-10 block overflow-hidden">
        <span
          ref={l1}
          className="block will-change-transform"
          style={{ color: t0 }}
        >
          {children}
        </span>
        <span
          ref={l2}
          aria-hidden
          className="absolute inset-0 block will-change-transform"
          style={{ color: t1 }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}
