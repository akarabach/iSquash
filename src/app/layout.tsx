import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mt-8 min-h-svh bg-background font-sans antialiased`}>
        {/*<div className="relative flex min-h-svh flex-col bg-background">*/}
        <div className="mx-auto max-w-7xl px-2">
          <header className="flex h-14 items-center justify-between">
            <nav className="flex w-full justify-between">
              <div className="flex shrink-0 grow-0 items-center">
                <Link
                  href="/"
                  className="mr-4 text-3xl font-bold text-gray-900"
                >
                  iSquash
                </Link>
              </div>
              <div className="flex shrink items-center justify-around gap-5 rounded-full bg-gray-100 px-3 py-2">
                <Link
                  href="/"
                  className="rounded-full bg-gray-900 p-2 text-white"
                >
                  Tournament
                </Link>
                <Link href="/">Dashboard</Link>
                <Link href="/">Schedule</Link>
                <Link href="/">Message</Link>
                <Link href="/">Support</Link>
              </div>

              <div className="flex items-center justify-end">login section</div>
            </nav>
          </header>

          {children}
        </div>
        {/*</div>*/}
      </body>
    </html>
  );
}
