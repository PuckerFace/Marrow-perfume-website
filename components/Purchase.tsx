'use client';
import gsap from 'gsap';
import Btn from './Btn';
import Bottle from './Bottle';
import { useCart } from '../lib/cart';
const P = [
  {
    id: 'travel',
    name: 'Travel',
    size: '10 ml',
    price: 85,
    note: 'Sealed iron tin. Fits a coat pocket and a bad decision.',
    s: 'w-32',
  },
  {
    id: 'full',
    name: 'Full size',
    size: '50 ml',
    price: 240,
    note: 'Obsidian-cast vessel. One of eighty-eight per batch.',
    s: 'w-48',
  },
];
export default function Purchase() {
  const { add } = useCart();
  const tilt = (e: any, on: boolean) =>
    gsap.to(e.currentTarget, {
      y: on ? -14 : 0,
      borderColor: on ? 'rgba(216,207,189,.7)' : 'rgba(216,207,189,.2)',
      duration: 0.6,
      ease: 'power3.out',
    });
  return (
    <section id="scent" className="mx-auto max-w-6xl px-5 py-40 md:px-10">
      <h2 className="font-display text-[14vw] uppercase leading-[.9] md:text-[8vw]">
        Experience the scent
      </h2>
      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {P.map((p) => (
          <article
            key={p.id}
            onMouseEnter={(e) => tilt(e, true)}
            onMouseLeave={(e) => tilt(e, false)}
            className="flex flex-col items-center border border-bone/20 bg-gradient-to-b from-[#120505] to-black p-8 text-center"
          >
            <div className="flex h-72 items-end">
              <Bottle
                className={`${p.s} drop-shadow-[0_0_40px_rgba(90,20,20,.6)]`}
              />
            </div>
            <h3 className="mt-8 font-display text-3xl uppercase">
              {p.name}, {p.size}
            </h3>
            <p className="mt-2 max-w-xs text-bone/70">{p.note}</p>
            <p className="mt-6 font-display text-4xl">${p.price}</p>
            <Btn
              className="mt-6 w-full max-w-xs"
              onClick={() =>
                add({
                  id: p.id,
                  name: `Marrow, ${p.name} ${p.size}`,
                  price: p.price,
                })
              }
            >
              Get Scent
            </Btn>
          </article>
        ))}
      </div>
    </section>
  );
}
