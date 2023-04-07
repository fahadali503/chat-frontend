import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App({ Component, pageProps }: AppProps) {
  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
  >
    <Notifications position='top-right' />
    <Component {...pageProps} />
  </MantineProvider>

}
