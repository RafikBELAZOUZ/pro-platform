import '@/styles/globals.css';
import { Suspense } from 'react';
import AuthProtected from '../dashboard/auth-protected';
import { PageLoader } from '@/components/Loader';

export default function DiagramLayout({ children }) {
  return (
    <Suspense fallback={<PageLoader />}>
        <AuthProtected>
        <div>
            {children}
        </div>
        </AuthProtected>
        </Suspense>
  );
}
