import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Firebase config. For production, set NEXT_PUBLIC_FIREBASE_API_KEY,
 * NEXT_PUBLIC_FIREBASE_PROJECT_ID, etc. in your host (e.g. Vercel) so
 * no keys are committed. Fallbacks here are for local dev only.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyCo0CQEx4dHESNv5Z2p5HfVeSUqx6XvoMA',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'ivyacademy-e44f5.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'ivyacademy-e44f5',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'ivyacademy-e44f5.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '1023575920393',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:1023575920393:web:21620d915628a438eacdd8',
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  app = getApps()[0] as FirebaseApp;
  db = getFirestore(app);
}

export { app, db };
