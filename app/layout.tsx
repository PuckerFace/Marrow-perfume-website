import './globals.css';
import { Anton, Cormorant_Garamond } from 'next/font/google';
import { CartProvider } from '../lib/cart';
const d = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});
const s = Cormorant_Garamond({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
});
export const metadata = {
  title: 'Marrow — Sillage & Bone',
  description: 'A brutalist fragrance of iron, cedar and ash.',
};
export default function L({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${d.variable} ${s.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
