'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Btn from './Btn';
import { useCart } from '../lib/cart';
const F = (p: any) => (
  <input
    required
    {...p}
    className="w-full border border-black/30 bg-transparent px-4 py-3 text-lg placeholder:text-black/40 focus:border-black focus:outline-none"
  />
);
function Express({ label, cls }: any) {
  return (
    <button
      type="button"
      onMouseEnter={(e) =>
        gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 })
      }
      onMouseLeave={(e) =>
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
      }
      className={`flex h-12 flex-1 items-center justify-center font-display text-lg tracking-wide ${cls}`}
    >
      {label}
    </button>
  );
}
export default function Checkout() {
  const { items, open, setOpen, change, clear, total } = useCart();
  const ov = useRef(null),
    pn = useRef(null),
    [done, setDone] = useState(false);
  useLayoutEffect(() => {
    gsap.set(pn.current, { xPercent: 100 });
    gsap.set(ov.current, { autoAlpha: 0 });
  }, []);
  useEffect(() => {
    gsap.to(ov.current, { autoAlpha: open ? 1 : 0, duration: 0.4 });
    gsap.to(pn.current, {
      xPercent: open ? 0 : 100,
      duration: 0.8,
      ease: 'power4.inOut',
    });
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  const ship = total > 0 ? 12 : 0;
  return (
    <div
      ref={ov}
      className="fixed inset-0 z-[80] bg-black/70"
      onClick={() => setOpen(false)}
    >
      <aside
        ref={pn}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-bone p-6 text-black md:w-[min(1000px,92vw)] md:p-12"
        aria-label="Checkout"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-4xl uppercase">Checkout</h2>
          <button
            onClick={() => setOpen(false)}
            className="font-display text-lg uppercase"
          >
            Close
          </button>
        </div>
        {done ? (
          <p className="mt-24 font-serif text-4xl italic">
            Order received. Marrow is on its way.
          </p>
        ) : (
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!items.length) return;
                clear();
                setDone(true);
              }}
              className="space-y-4"
            >
              <p className="font-display text-lg uppercase">Express checkout</p>
              <div className="flex gap-3">
                <Express label="Apple Pay" cls="bg-black text-white" />
                <Express
                  label="G Pay"
                  cls="border border-black bg-white text-black"
                />
                <Express label="Shop Pay" cls="bg-[#5a31f4] text-white" />
              </div>
              <p className="py-2 text-center text-black/60">or pay by card</p>
              <F type="email" placeholder="Email" />
              <div className="grid grid-cols-2 gap-3">
                <F placeholder="First name" />
                <F placeholder="Last name" />
              </div>
              <F placeholder="Address" />
              <div className="grid grid-cols-2 gap-3">
                <F placeholder="City" />
                <F placeholder="Postal code" />
              </div>
              <F placeholder="Card number" inputMode="numeric" />
              <div className="grid grid-cols-2 gap-3">
                <F placeholder="MM / YY" />
                <F placeholder="CVC" />
              </div>
              <Btn type="submit" variant="dark" className="w-full">
                Pay ${(total + ship).toFixed(2)}
              </Btn>
            </form>
            <div>
              <p className="font-display text-lg uppercase">Your order</p>
              {!items.length && (
                <p className="mt-4 text-black/60">
                  Your cart is empty. Close this panel and choose a size.
                </p>
              )}
              {items.map((i: any) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between border-b border-black/20 py-4"
                >
                  <div>
                    <p>{i.name}</p>
                    <div className="mt-1 flex items-center gap-3 font-display">
                      <button
                        aria-label="Remove one"
                        onClick={() => change(i.id, -1)}
                      >
                        −
                      </button>
                      {i.qty}
                      <button
                        aria-label="Add one"
                        onClick={() => change(i.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-display text-xl">${i.price * i.qty}</p>
                </div>
              ))}
              <dl className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>${total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>${ship}</dd>
                </div>
                <div className="flex justify-between font-display text-2xl">
                  <dt>Total</dt>
                  <dd>${total + ship}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
