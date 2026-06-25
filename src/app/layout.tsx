import type { Metadata } from 'next';
import { Playfair_Display, Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
});

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: '400',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "The Shining Light — CAC Fyb Class '26",
  description:
    "Dinner night ticket — Matthew 5:13-16 | CAC Chapel Lautech FYB Class '26",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
