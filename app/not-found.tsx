import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ivy-corner-logo.png"
          alt=""
          className="h-16 w-16 mx-auto mb-6 object-contain"
        />
        <h1 className="font-cinzel-decorative font-bold text-ink uppercase text-2xl tracking-widest mb-2">
          IVY
        </h1>
        <h2 className="tier-1-gravitas text-xl sm:text-2xl text-charcoal mb-4">
          Page not found
        </h2>
        <p className="tier-2-instruction text-charcoal/80 mb-8">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-ink text-cream font-medium rounded hover:bg-charcoal transition-colors"
          aria-label="Go to dashboard"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
