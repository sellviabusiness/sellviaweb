import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-label-sm uppercase tracking-widest text-gray-02">
        404
      </p>
      <h1 className="font-heading text-display-md font-bold tracking-tight text-white">
        This page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="font-body text-body-md text-gray-01 transition-colors duration-150 hover:text-white"
      >
        Back to SellVia <span className="text-accent">→</span>
      </Link>
    </main>
  );
}
