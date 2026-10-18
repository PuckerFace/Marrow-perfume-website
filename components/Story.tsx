'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);
// function Slab({ velvet, className = '' }: any) {
//   return (
//     <div className={`img-rv relative overflow-hidden ${className}`}>
//       <div
//         className="absolute inset-0"
//         style={{
//           background: velvet
//             ? 'repeating-linear-gradient(100deg,rgba(255,255,255,.03) 0 2px,transparent 2px 5px),radial-gradient(120% 90% at 30% 20%,#6a1717,#2a0707 55%,#000)'
//             : 'radial-gradient(100% 80% at 70% 15%,#34343a,#0c0c0e 60%,#000)',
//         }}
//       >
//         {/* <svg
//           viewBox="0 0 100 125"
//           preserveAspectRatio="xMidYMid slice"
//           className="absolute inset-0 h-full w-full"
//           fill="none"
//           stroke="#d8cfbd"
//           strokeOpacity={velvet ? 0.25 : 0.5}
//           strokeWidth=".35"
//         >
//           <path d="M62 0L55 22 63 40 48 62 56 80 40 104 44 125" />
//           <path d="M55 22L30 30 22 48" />
//           <path d="M48 62L72 70 84 92" />
//           <path d="M63 40L88 36" />
//           <path d="M40 104L18 112" />
//         </svg> */}
//         {velvet && (
//           <Image
//             src="/handspray.jpg"
//             width={781}
//             height={1168}
//             alt="Marrow perfume bottle in cracked obsidian glass with a forged iron cap"
//             className={`aspect-[781/1168] object-contain ${className}`}
//           />
//         )}
//         :{' '}
//         {
//           <Image
//             src="/smoke.jpg"
//             width={781}
//             height={1168}
//             alt="Marrow perfume slab"
//             className={`aspect-[781/1168] object-fill ${className}`}
//           />
//         }
//       </div>
//     </div>
//   );
// }
export default function Story() {
  const r = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const c = gsap.context(() => {
      gsap.set('.rv', { opacity: 0, y: 50 });
      ScrollTrigger.batch('.rv', {
        start: 'top 88%',
        once: true,
        onEnter: (b) =>
          gsap.to(b, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: 'power3.out',
          }),
      });
      gsap.utils.toArray<HTMLElement>('.img-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
        gsap.fromTo(
          el.firstElementChild,
          { scale: 1.3 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, r);
    return () => c.revert();
  }, []);
  return (
    <section
      id="story"
      ref={r}
      className="mx-auto max-w-7xl px-5 py-40 md:px-10"
    >
      <h2 className="rv font-display text-[15vw] uppercase leading-[.9] md:text-[9vw]">
        Made from what remains.
      </h2>
      <div className="mt-28 grid items-center gap-9 md:grid-cols-13">
        {/* md:grid-cols-12 */}
        {/* <Slab className="aspect-[4/5] md:col-span-5" /> */}
        <div className="space-y-6 md:col-span-5 md:col-start-8">
          <p className="rv text-2xl md:text-3xl">
            We start with a cold iron bar, hot-forged and quenched in vetiver
            oil until the air tastes of blood and coin.
          </p>
          <p className="rv text-bone/70">
            Every batch of Marrow is limited to eighty-eight vessels. The cedar
            is smoked for forty days over its own offcuts. The ash is
            hand-ground from burnt oak bone and folded in last, slowly, by one
            person.
          </p>
        </div>
      </div>
      <div className="mt-12  grid items-center gap-12 md:grid-cols-12">
        {/* md:grid-cols-12 */}
        <div className="order-2 space-y-6 md:order-1 md:col-span-5">
          <p className="rv text-2xl md:text-3xl">
            The scent doesn't announce itself. It arrives a minute after you
            leave the room.
          </p>
          <p className="rv text-bone/70">
            Cured for ninety days in cracked obsidian vessels and finished with
            a velvet-soaked amber that clings to wool, skin and memory. Not for
            everyone. That is the point.
          </p>
        </div>
        {/* <Slab
          velvet
          className="order-1 aspect-[3/4] md:order-2 md:col-span-6 md:col-start-7"
        /> */}
      </div>
    </section>
  );
}
