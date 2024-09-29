import Footer from '@/components/Footer';
import ClientProviders from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Fathom from '@/components/Fathom';
import { GoogleAnalytics } from '@next/third-parties/google'

import { NtDapperFont } from '@/fonts';
import { isProduction } from '@/utils';

import '@/styles/globals.css';
import RootLayout from '@/app/layout';

export default function DiagramLayout({ children }) {
  return (
    <div>
        {children}
    </div>
    
  );
}
