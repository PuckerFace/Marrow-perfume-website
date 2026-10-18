'use client';
import Btn from './Btn';
import { goTo } from './Hero';
import { useCart } from '../lib/cart';
export default function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black to-transparent px-5 py-5 md:px-10">
      <a href="#" className="font-display text-lg tracking-[.12em]">
        SILLAGE &amp; BONE
      </a>
      <div className="flex items-center gap-4 md:gap-8">
        <button
          aria-label={`Cart, ${count} items`}
          onClick={() => setOpen(true)}
          className="relative p-2"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M4 7h16l-1.5 13h-13zM9 7V5a3 3 0 016 0v2" />
          </svg>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-ember font-display text-xs">
              {count}
            </span>
          )}
        </button>
        <Btn
          variant="ghost"
          onClick={() => goTo('#scent')}
          className="!px-5 !py-3"
        >
          Get Scent
        </Btn>
      </div>
    </nav>
  );
}
