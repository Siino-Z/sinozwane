import '../styles/SkillsConstellation.scss'; // Import global SCSS

import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
