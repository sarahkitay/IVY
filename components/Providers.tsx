'use client';

import FirebaseSync from './FirebaseSync';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FirebaseSync />
    </>
  );
}
