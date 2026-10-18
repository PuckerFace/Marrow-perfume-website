'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Btn from './Btn';
import Bottle from './Bottle';
import { goTo } from './Hero';
gsap.registerPlugin(ScrollTrigger);
function Field({ kind }: { kind: string }) {
  const r = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = r.current!,
      g = c.getContext('2d')!;
    let w = 0,
      h = 0,
      raf = 0,
      on = false;
    const R = Math.random;
    const fit = () => {
      w = c.width = c.offsetWidth;
      h = c.height = c.offsetHeight;
    };
    fit();
    addEventListener('resize', fit);
    const mk = (i = false) => ({
      x: R() * w,
      y: i ? R() * h : kind === 'iron' ? h + 20 : -20,
      s:
        kind === 'ash'
          ? 1 + R() * 4
          : kind === 'iron'
            ? 1 + R() * 2.2
            : 3 + R() * 9,
      vx: (R() - 0.5) * (kind === 'iron' ? 1.2 : 0.6),
      vy:
        kind === 'iron'
          ? -(1 + R() * 3)
          : 0.3 + R() * (kind === 'ash' ? 1 : 1.4),
      a: R() * 6,
      va: (R() - 0.5) * 0.05,
      o: 0.2 + R() * 0.7,
      p: R() * 9,
    });
    const ps = Array.from({ length: kind === 'ash' ? 110 : 60 }, () =>
      mk(true),
    );
    const draw = () => {
      raf = requestAnimationFrame(draw);
      g.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.p += 0.02;
        p.x +=
          p.vx +
          Math.sin(p.p) * (kind === 'ash' ? 0.5 : kind === 'cedar' ? 0.9 : 0.2);
        p.y += p.vy;
        p.a += p.va;
        if (p.y < -30 || p.y > h + 30) Object.assign(p, mk());
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.a);
        g.globalAlpha = p.o;
        if (kind === 'iron') {
          g.fillStyle = p.o > 0.65 ? '#ff8a3d' : '#9fb0c2';
          g.fillRect(-p.s / 2, -p.s * 3, p.s, p.s * 6);
        } else if (kind === 'cedar') {
          g.fillStyle = p.o > 0.5 ? '#b8793a' : '#6b4423';
          g.beginPath();
          g.ellipse(0, 0, p.s, p.s * 0.3, 0, 0, 7);
          g.fill();
        } else {
          g.fillStyle = p.o > 0.5 ? '#9a9a96' : '#55554f';
          g.beginPath();
          g.moveTo(-p.s, 0);
          g.lineTo(0, -p.s * 0.7);
          g.lineTo(p.s, p.s * 0.2);
          g.lineTo(0, p.s * 0.8);
          g.fill();
        }
        g.restore();
      }
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) {
        on = true;
        draw();
      } else if (!e.isIntersecting && on) {
        on = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(c);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener('resize', fit);
    };
  }, [kind]);
  return <canvas ref={r} className="absolute inset-0 h-full w-full" />;
}
const N = [
  {
    k: 'iron',
    t: 'Iron',
    pos: 'Top note',
    d: 'Hot-forged shavings quenched in vetiver. Cold on the tongue, a little like blood.',
    bg: 'radial-gradient(90% 70% at 20% 90%,#1b2530,#05070a 70%)',
  },
  {
    k: 'cedar',
    t: 'Cedar',
    pos: 'Heart note',
    d: 'Smoked forty days over its own offcuts. Resinous, dry, quietly threatening.',
    bg: 'radial-gradient(90% 70% at 80% 90%,#2e1a0a,#080402 70%)',
  },
  {
    k: 'ash',
    t: 'Ash',
    pos: 'Base note',
    d: 'Burnt oak bone, ground by hand. What the fire leaves on your skin.',
    bg: 'radial-gradient(90% 70% at 50% 100%,#2a2a28,#050505 70%)',
  },
];
const orbC = [
  'radial-gradient(circle at 35% 30%,#b9c8d8,#4c5b6b)',
  'radial-gradient(circle at 35% 30%,#e0a05c,#6b4423)',
  'radial-gradient(circle at 35% 30%,#b8b8b2,#4a4a46)',
];
export default function Discovery() {
  const root = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root.current!);
    const merge = (tl: gsap.core.Timeline, at: number) => {
      tl.fromTo(
        '.orb',
        {
          x: (i: number) => [-170, 0, 170][i],
          y: (i: number) => [60, -150, 60][i],
          scale: 1,
          opacity: 1,
        },
        {
          x: 0,
          y: 30,
          scale: 0.15,
          duration: 1,
          ease: 'power3.in',
          stagger: 0.05,
        },
        at,
      )
        .fromTo(
          '.m-bottle',
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.92 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.3,
            ease: 'power2.inOut',
          },
          at + 0.7,
        )
        .fromTo(
          '.m-glow',
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          at + 1,
        )
        .to('.orb', { opacity: 0, duration: 0.1 }, at + 0.95)
        .fromTo(
          '.m-txt',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5 },
          at + 1.8,
        );
    };
    mm.add('(min-width:768px)', () => {
      gsap.set('.m-bottle', { clipPath: 'inset(100% 0% 0% 0%)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=600%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track.current, {
        x: () => -(track.current!.scrollWidth - innerWidth),
        duration: 3,
      }).fromTo('.word', { xPercent: 25 }, { xPercent: -25, duration: 3 }, 0);
      merge(tl, 3);
      tl.to({}, { duration: 0.4 });
    });
    mm.add('(max-width:767px)', () => {
      gsap.set('.m-bottle', { clipPath: 'inset(100% 0% 0% 0%)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.merge-panel',
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      merge(tl, 0);
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} className="relative overflow-hidden md:h-screen">
      <div ref={track} className="flex max-md:flex-col md:w-[400vw]">
        {N.map((n, i) => (
          <div
            key={n.k}
            className="relative flex min-h-[100svh] w-screen shrink-0 items-end overflow-hidden px-5 pb-20 md:h-screen md:px-16"
            style={{ background: n.bg }}
          >
            <Field kind={n.k} />
            <h3 className="word absolute left-0 top-1/4 whitespace-nowrap font-display text-[34vw] uppercase leading-none text-transparent stroke-text">
              {n.t}
            </h3>
            <div className="relative z-10 max-w-md">
              <p className="font-display text-2xl uppercase tracking-wide">
                {n.t}
              </p>
              <p className="font-serif italic text-bone/60">{n.pos}</p>
              <p className="mt-4 text-xl">{n.d}</p>
            </div>
          </div>
        ))}
        <div className="merge-panel relative flex min-h-[100svh] w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-black px-5 md:h-screen">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 55%, rgba(60, 60, 60, 0.35), #000 70%)',
            }}
          />
          <div className="relative aspect-[781/1168] w-52 md:w-72">
            <div
              className="m-glow absolute -inset-[35%]"
              style={{
                background:
                  'radial-gradient(closest-side,rgba(216,207,189,.22),rgba(90,20,20,.12) 55%,transparent)',
              }}
            />
            <div className="m-bottle relative h-full w-full">
              <Bottle className="h-full w-full" />
            </div>
            {orbC.map((b, i) => (
              <div
                key={i}
                className="orb absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16 rounded-full"
                style={{
                  background: b,
                  boxShadow: '0 0 40px rgba(216,207,189,.25)',
                }}
              />
            ))}
          </div>
          <div className="m-txt relative mt-10 text-center">
            <p className="font-serif text-3xl italic">
              Iron. Cedar. Ash. One wound.
            </p>
            <div className="mt-6">
              <Btn onClick={() => goTo('#scent')}>Experience the Scent</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
