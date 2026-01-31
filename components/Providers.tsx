'use client';

import AuthInit from './AuthInit';
import FirebaseSync from './FirebaseSync';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInit />
      {children}
      <FirebaseSync />
    </>
  );
}
