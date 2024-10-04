import '@/styles/globals.css';
import AuthProtected from '../dashboard/auth-protected';

export default function DiagramLayout({ children }) {
  return (
    <AuthProtected>
    <div>
        {children}
    </div>
    </AuthProtected>
    
  );
}
