'use client';
import { useState } from 'react';
import Btn from './Btn';
import gsap from 'gsap';
const S = ['Instagram', 'TikTok', 'Pinterest'];
export default function Footer() {
  const [ok, setOk] = useState(false);
  return (
    <footer className="border-t border-bone/20 px-5 pb-10 pt-24 md:px-10">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl uppercase md:text-7xl">
            Join the smoke.
          </h2>
          <p className="mt-3 max-w-sm text-bone/70">
            Batch releases and restocks. Nothing else.
          </p>
          {ok ? (
            <p className="mt-8 font-serif text-2xl italic">
              You're on the list.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOk(true);
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <input
                required
                type="email"
                aria-label="Email"
                placeholder="Email address"
                className="flex-1 border border-bone/40 bg-transparent px-4 py-4 focus:border-bone focus:outline-none"
              />
              <Btn type="submit">Subscribe</Btn>
            </form>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-display uppercase">Support</p>
            <a
              href="mailto:support@sillageandbone.com"
              className="mt-2 block text-bone/70 hover:text-bone"
            >
              Contact customer support
            </a>
          </div>
          <div>
            <p className="font-display uppercase">Follow</p>
            {S.map((s) => (
              <a
                key={s}
                href="#"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { x: 10, duration: 0.3 })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, { x: 0, duration: 0.3 })
                }
                className="mt-2 block text-bone/70 hover:text-bone"
              >
                @sillageandbone · {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-24 font-display text-[11vw] leading-none text-bone/10">
        SILLAGE &amp; BONE
      </p>
    </footer>
  );
}
