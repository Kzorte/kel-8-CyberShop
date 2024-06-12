import HeaderLogged from '@/components/Header/HeaderLogged';
import { AuthProvider } from '@/context/AuthContext';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false); // Dimulai dengan false

  useEffect(() => {
    if (router.isReady) {
      const noHeaderPaths = ['/login', '/signup'];
      setShowHeader(!noHeaderPaths.includes(router.pathname));
    }
  }, [router.isReady, router.pathname]);

  console.log("Rendering AuthProvider");
  return (
    <AuthProvider>
      {showHeader && <HeaderLogged />}
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
