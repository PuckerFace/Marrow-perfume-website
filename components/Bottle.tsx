export default function Bottle({ className = '' }: { className?: string }) {
  return (
    <img
      src="/marrow-bottle.png"
      width={781}
      height={1168}
      alt="Marrow perfume bottle in cracked obsidian glass with a forged iron cap"
      className={`aspect-[781/1168] object-contain ${className}`}
    />
  );
}
