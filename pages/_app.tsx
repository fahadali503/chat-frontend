import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux'
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {

  return <Provider store={store}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position='top-right' />
      <Component {...pageProps} />
    </MantineProvider>
  </Provider>
}
