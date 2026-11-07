import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-sf-bright tracking-widest mb-4">Page Not Found</h1>
      <p className="text-sm text-sf-muted font-sans mb-6">This page doesn&apos;t exist. It may have moved, or the link may be wrong.</p>
      <Link to="/" className="text-sm text-sf-bright underline hover:text-sf-green transition-colors font-sans">Back to Home</Link>
    </main>
  );
}
