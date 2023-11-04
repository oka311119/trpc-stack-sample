"use client";

import { TrpcProvider } from "./provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>{/* snip */}</head>
      <body>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
