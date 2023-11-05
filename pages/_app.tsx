import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContext, ThemeProvider } from '../components/theme/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider
   disableBaseline={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
    
}
