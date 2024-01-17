import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/Layout'; // Assuming you have a Layout component
import { ConnectKitProvider } from 'connectkit';
import { WagmiConfig } from 'wagmi';

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider debugMode>
          <Layout title={''} description={''}>
            <Component {...pageProps} />
          </Layout>
        </ConnectKitProvider >
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;