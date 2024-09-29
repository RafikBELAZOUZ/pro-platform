import Footer from '@/components/Footer';
import ClientProviders from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Fathom from '@/components/Fathom';
import { GoogleAnalytics } from '@next/third-parties/google'

import { NtDapperFont } from '@/fonts';
import { isProduction } from '@/utils';

import '@/styles/globals.css';

export default function DiagramLayout({ children }) {
  return (
    <html lang="en" className={NtDapperFont.className}>
      <body className="bg-white">
        <ClientProviders>
          <div className="bg-white">
            <Navigation />
            <div className="p-4 relative min-h-[calc(100vh-200px)]">{children}</div>
            <Footer />
          </div>
        </ClientProviders>
        {isProduction() && <Fathom />}
      </body>
    </html>
  );
}
