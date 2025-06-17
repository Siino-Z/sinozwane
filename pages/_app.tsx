import '../styles/SkillsConstellation.scss'; // Import global SCSS here

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}