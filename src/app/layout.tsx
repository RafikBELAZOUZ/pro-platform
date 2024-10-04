import Footer from '@/components/Footer';
import ClientProviders from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Fathom from '@/components/Fathom';
import { GoogleAnalytics } from '@next/third-parties/google'

import { NtDapperFont } from '@/fonts';
import { isProduction } from '@/utils';

import '@/styles/globals.css';

// @todo add more metadata here
export const metadata = {
  title: 'Test Diagram',
  description:
    'Build Better Node-Based UIs with Test Diagram. By subscribing to Test Diagram you are securing the maintanance and development of our open source libraries.',
};

// @todo add analytics on button click,

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={NtDapperFont.className}>
      <body className="bg-white">
        <ClientProviders>
          <div className="bg-white">
            <Navigation />
            <div className="relative min-h-[calc(100vh-200px)] m-0 p-0">{children}</div>
            <Footer />
          </div>
        </ClientProviders>
        {isProduction() && <Fathom />}
      </body>
      <GoogleAnalytics gaId="G-Q8L6LF2BFV" />
    </html>
  );
}
